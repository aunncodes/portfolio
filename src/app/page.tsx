import Terminal from "@/components/Terminal";
import { loadVfs } from "@/lib/vfs";

export default async function Home() {
  const vfs = await loadVfs();

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <Terminal vfs={vfs} />
    </div>
  );
}
