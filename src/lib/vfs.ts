export type VfsNode = { type: "dir"; children: Record<string, VfsNode> } | { type: "file"; content: string };

async function buildNodeFromDir(dirPath: string): Promise<VfsNode> {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");

  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  const children: Record<string, VfsNode> = {};
  for (const entry of entries) {
    const full = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      children[entry.name] = await buildNodeFromDir(full);
    } else if (entry.isFile()) {
      const content = await fs.readFile(full, "utf8");
      children[entry.name] = { type: "file", content };
    }
  }

  return { type: "dir", children };
}

export async function loadVfs(): Promise<VfsNode> {
  const path = await import("node:path");
  const contentRoot = path.join(process.cwd(), "content");
  return await buildNodeFromDir(contentRoot);
}

export function splitPath(p: string): string[] {
  return p.split("/").filter(Boolean);
}

export function normalizePath(cwd: string[], inputPath: string): string[] {
  const base = inputPath.startsWith("/") ? [] : [...cwd];
  for (const part of splitPath(inputPath)) {
    if (part === ".") continue;
    if (part === "..") base.pop();
    else base.push(part);
  }
  return base;
}

export function getNode(root: VfsNode, pathParts: string[]): VfsNode | null {
  let cur: VfsNode = root;
  for (const part of pathParts) {
    if (cur.type !== "dir") return null;
    const next = cur.children[part];
    if (!next) return null;
    cur = next;
  }
  return cur;
}

export function formatCwd(cwd: string[]): string {
  return "/" + cwd.join("/");
}
