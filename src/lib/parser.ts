export type ParsedCommand = {
  cmd: string;
  args: string[];
};

export function tokenize(input: string): string[] {
  const tokens: string[] = [];
  let cur = "";
  let quote: "'" | '"' | null = null;

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];

    if (quote) {
      if (ch === quote) {
        quote = null;
      } else if (ch === "\\" && i + 1 < input.length) {
        cur += input[i + 1];
        i++;
      } else {
        cur += ch;
      }
      continue;
    }

    if (ch === "'" || ch === '"') {
      quote = ch;
      continue;
    }

    if (/\s/.test(ch)) {
      if (cur.length) {
        tokens.push(cur);
        cur = "";
      }
      continue;
    }

    cur += ch;
  }

  if (cur.length) tokens.push(cur);
  return tokens;
}

export function parseCommand(input: string): ParsedCommand | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const tokens = tokenize(trimmed);
  const [cmd, ...args] = tokens;
  return { cmd: cmd.toLowerCase(), args };
}
