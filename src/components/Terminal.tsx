"use client";

import { useState } from "react";

export default function Terminal() {
  const [lines, setLines] = useState<string[]>([
    "Welcome to cmd",
    "Type `help` to get started.",
    "",
  ]);
  const [input, setInput] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLines(prev => [...prev, `$ ${input}`, "command not found", ""]);
    setInput("");
  }

  return (
    <div className="w-full mx-auto">
      {lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}

      <form onSubmit={handleSubmit} className="flex">
        <span className="mr-2">$</span>
        <input
          autoFocus
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none"
        />
      </form>
    </div>
  );
}
