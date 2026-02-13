import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center min-h-[90vh] bg-black text-white overflow-hidden">

      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl -translate-x-1/2"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center">

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
          Hi, I’m{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Sahil Chopra
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          I do backend, frontend, and pretty much everything software related.
        </p>

        <div className="mt-10 flex items-center justify-center gap-6">

          <Link
            href="/projects"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
          >
            View Projects
          </Link>

          <Link
            href="/contact"
            className="px-6 py-3 rounded-lg border border-white/20 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            Contact Me
          </Link>

        </div>

      </div>
    </section>
  );
}
