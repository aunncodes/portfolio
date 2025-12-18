import type { VfsNode } from "./vfs";
import { formatCwd, getNode, normalizePath } from "./vfs";
import type { ParsedCommand } from "./parser";

export type TerminalState = {
  cwd: string[];
};

export type ExecResult = {
  lines: string[];
  nextState: TerminalState;
  clear?: boolean;
};

function listDir(node: VfsNode): string[] {
  if (node.type !== "dir") return [];
  return Object.keys(node.children).sort();
}

export function executeCommand(parsed: ParsedCommand, state: TerminalState, vfs: VfsNode): ExecResult {
  const { cmd, args } = parsed;

  if (cmd === "help") {
    return {
      lines: ["Commands:", "help: Show this help", "pwd: Print current directory", "ls [path]: List directory", "cd [path]: Change directory", "cat [file]: Print file contents", "clear: Clear the screen"],
      nextState: state,
    };
  }

  if (cmd === "pwd") {
    return { lines: [formatCwd(state.cwd)], nextState: state };
  }

  if (cmd === "clear") {
    return { lines: [], nextState: state, clear: true };
  }

  if (cmd === "ls") {
    const targetPath = args[0] ?? ".";
    const parts = normalizePath(state.cwd, targetPath);
    const node = getNode(vfs, parts);
    if (!node) return { lines: [`ls: cannot access '${targetPath}': No such file or directory`], nextState: state };

    if (node.type === "file") {
      return { lines: [parts[parts.length - 1] ?? targetPath], nextState: state };
    }

    const items = listDir(node);
    return { lines: [items.join("  ")], nextState: state };
  }

  if (cmd === "cd") {
    const targetPath = args[0];
    if (!targetPath) return { lines: ["cd: missing operand"], nextState: state };

    const parts = normalizePath(state.cwd, targetPath);
    const node = getNode(vfs, parts);
    if (!node) return { lines: [`cd: ${targetPath}: No such file or directory`], nextState: state };
    if (node.type !== "dir") return { lines: [`cd: ${targetPath}: Not a directory`], nextState: state };

    return { lines: [], nextState: { ...state, cwd: parts } };
  }

  if (cmd === "cat") {
    const targetPath = args[0];
    if (!targetPath) return { lines: ["cat: missing operand"], nextState: state };

    const parts = normalizePath(state.cwd, targetPath);
    const node = getNode(vfs, parts);
    if (!node) return { lines: [`cat: ${targetPath}: No such file or directory`], nextState: state };
    if (node.type !== "file") return { lines: [`cat: ${targetPath}: Is a directory`], nextState: state };

    return { lines: node.content.replace(/\r\n/g, "\n").split("\n"), nextState: state };
  }

  return { lines: [`${cmd}: command not found`], nextState: state };
}
