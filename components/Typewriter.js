"use client";
import { useEffect, useState } from "react";
import "./Typewriter.css";

const Typewriter = ({ texts, period = 2000 }) => {
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        let typingTimeout;
        const currentText = texts[loopNum % texts.length];

        if (isDeleting) {
            typingTimeout = setTimeout(() => {
                setText((prev) => prev.substring(0, prev.length - 1));
                setTypingSpeed(75);
            }, typingSpeed);
        } else {
            typingTimeout = setTimeout(() => {
                setText((prev) => currentText.substring(0, prev.length + 1));
                setTypingSpeed(150);
            }, typingSpeed);
        }

        if (!isDeleting && text === currentText) {
            typingTimeout = setTimeout(() => setIsDeleting(true), period);
        } else if (isDeleting && text === "") {
            setIsDeleting(false);
            setLoopNum((prev) => prev + 1);
        }

        return () => clearTimeout(typingTimeout);
    }, [text, isDeleting, loopNum, texts, period, typingSpeed]);

    return (
        <h1 className="text-4xl fon t-bold title">
            {text}
            <span className="border-r-2 border-white animate-blink">&nbsp;</span>
        </h1>
    );
};

export default Typewriter;
