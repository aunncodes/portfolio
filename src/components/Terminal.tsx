"use client";

import { useMemo, useRef, useState } from "react";
import { parseCommand } from "@/lib/parser";
import { executeCommand, type TerminalState } from "@/lib/commands";
import { formatCwd } from "@/lib/vfs";
import type { VfsNode } from "@/lib/vfs";

export default function Terminal({ vfs }: { vfs: VfsNode }) {
  const [lines, setLines] = useState<string[]>(["Welcome to Command Prompt", "Type help to get started.", ""]);

  const [input, setInput] = useState("");
  const [state, setState] = useState<TerminalState>({ cwd: [] });
  const inputRef = useRef<HTMLInputElement | null>(null);

  const prompt = useMemo(() => `user@portfolio:${formatCwd(state.cwd)}$`, [state.cwd]);

  function runCommand(raw: string) {
    const parsed = parseCommand(raw);
    setLines(prev => [...prev, `${prompt} ${raw}`]);

    if (!parsed) {
      setLines(prev => [...prev, ""]);
      return;
    }

    const res = executeCommand(parsed, state, vfs);
    setState(res.nextState);

    setLines(prev => {
      const base = res.clear ? [] : prev;
      return [...base, ...res.lines, ""];
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const raw = input;
    setInput("");
    runCommand(raw);
  }

  return (
    <div className="w-full mx-auto text-green-400">
      <div className="whitespace-pre-wrap leading-6">
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2" onClick={() => inputRef.current?.focus()}>
        <span className="select-none">{prompt}</span>
        <input ref={inputRef} autoFocus value={input} onChange={e => setInput(e.target.value)} className="flex-1 bg-transparent outline-none" />
      </form>
    </div>
  );
}
