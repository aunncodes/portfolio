import Navbar from "../../components/Navbar";
import Typewriter from "../../components/Typewriter";
import "./page.css";

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center fancybg text-white">
                <h1 className="text-4xl fon t-bold">Hi, I'm Sahil. I make</h1>
                <Typewriter texts={["websites.", "backend.", "passion projects."]}
                            period={2000}/>
            </div>
        </>
    );
}
