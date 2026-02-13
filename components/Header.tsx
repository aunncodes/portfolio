import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/60 border-b border-white/10 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        <Link href="/">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight cursor-pointer">
            Sahil Chopra
          </h1>
        </Link>

        <nav>
          <ul className="flex items-center space-x-8 text-sm font-medium">

            <li className="relative group">
              <Link
                href="/about"
                className="text-gray-300 transition-colors duration-300 group-hover:text-white"
              >
                About
              </Link>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </li>

            <li className="relative group">
              <Link
                href="/projects"
                className="text-gray-300 transition-colors duration-300 group-hover:text-white"
              >
                Projects
              </Link>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </li>

            <li className="relative group">
              <Link
                href="/contact"
                className="text-gray-300 transition-colors duration-300 group-hover:text-white"
              >
                Contact
              </Link>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </li>

          </ul>
        </nav>
      </div>
    </header>
  );
}
