"use client";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

export default function Navbar() {
    const [active, setActive] = useState(null);

    function handleToggle(section) {
        setActive(active === section ? null : section);
    }

    return (
        <>
            <nav className="navigationWrapper">
                <div className="logoWrapper">
                    <span className="stylish">Stylish</span>
                    <span className="logo">Logo</span>
                </div>
                <ul className="navigation">
                    <li className="parent">
                        <Link className="link" href="#">Home</Link>
                    </li>
                    <li className="parent">
                        <Link className="link" href="#">About</Link>
                    </li>

                    <li
                        className={`parent ${active === "clients" ? "active" : ""}`}
                        onClick={() => handleToggle("clients")}
                    >
                        <Link className="link" href="#">
                            <FontAwesomeIcon icon={faMinus} className={active === "clients" ? "visible" : "hidden"} />
                            Clients
                            <FontAwesomeIcon icon={faPlus} className={active === "clients" ? "hidden" : "visible"} />
                        </Link>
                        <ul className="subnavigation">
                            <li><Link className="link" href="#">Burger King</Link></li>
                            <li><Link className="link" href="#">Southwest Airlines</Link></li>
                            <li><Link className="link" href="#">Levi Strauss</Link></li>
                        </ul>
                    </li>

                    <li
                        className={`parent ${active === "services" ? "active" : ""}`}
                        onClick={() => handleToggle("services")}
                    >
                        <Link className="link" href="#">
                            <FontAwesomeIcon icon={faMinus} className={active === "services" ? "visible" : "hidden"} />
                            Services
                            <FontAwesomeIcon icon={faPlus} className={active === "services" ? "hidden" : "visible"} />
                        </Link>
                        <ul className="subnavigation">
                            <li><Link className="link" href="#">Print Design</Link></li>
                            <li><Link className="link" href="#">Web Design</Link></li>
                            <li><Link className="link" href="#">Mobile App Development</Link></li>
                        </ul>
                    </li>

                    <li className="parent"><Link className="link" href="#">Contact</Link></li>
                </ul>
            </nav>
        </>
    );
}
