import Navbar from "../../components/Navbar";

export default function Home() {
  return (
      <>
          <Navbar/>
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
              <h1 className="text-4xl fon t-bold">Welcome to My Portfolio</h1>
              <p className="text-lg mt-2">Backend Developer & Web Enthusiast</p>
          </div>
      </>
  );
}
