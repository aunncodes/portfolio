import Navbar from "../../components/Navbar";
import Typewriter from "../../components/Typewriter";
import "./page.css";
import Carousel from "../../components/Carousel";
import {FiCircle, FiCode, FiFileText, FiLayers, FiLayout} from "react-icons/fi";

const projects = [
    {
        title: "Snake AI",
        description: "A genetic algorithm for Snake",
        id: 1,
        icon: <FiFileText className="carousel-icon" />,
    },
    {
        title: "Casino Bot",
        description: "A Discord bot for online casino games",
        id: 2,
        icon: <FiCircle className="carousel-icon" />,
    },
    {
        title: "The Button",
        description: "A web app based on 'The Button' game",
        id: 3,
        icon: <FiLayers className="carousel-icon" />,
    },
];

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center fancybg text-white">
                <h1 className="text-4xl fon t-bold">Hi, I'm Sahil. I make</h1>
                <Typewriter texts={["websites.", "backend.", "passion projects."]} period={2000}/>
                <Carousel
                    items={projects}
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
