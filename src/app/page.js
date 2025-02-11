export const metadata = {
    title: 'My Portfolio',
    description: 'Welcome to Next.js',
}
export default function Home() {
  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
        <p className="text-lg mt-2">Backend Developer & Web Enthusiast</p>
      </div>
  );
}
