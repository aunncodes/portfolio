import Navbar from "../../components/Navbar";
import Typewriter from "../../components/Typewriter";
import "./page.css";
import Carousel from "../../components/Carousel";

// const projects = [
//     { title: "Snake AI", description: "A genetic algorithm for Snake", github: "https://github.com/yourrepo/snake-ai", image: "https://picsum.photos/200/300" },
//     { title: "Casino Bot", description: "A Discord bot for online casino games", github: "https://github.com/yourrepo/casino-bot", image: "https://picsum.photos/200/300" },
//     { title: "The Button", description: "A web app based on 'The Button' game", github: "https://github.com/yourrepo/the-button", image: "https://picsum.photos/200/300" },
// ];

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center fancybg text-white">
                <h1 className="text-4xl fon t-bold">Hi, I'm Sahil. I make</h1>
                <Typewriter texts={["websites.", "backend.", "passion projects."]} period={2000}/>
                <Carousel
                    baseWidth={600}
                    autoplay={true}
                    autoplayDelay={3000}
                    pauseOnHover={true}
                    loop={true}
                    round={false}
                />
            </div>
        </>
    );
}
