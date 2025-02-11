"use client";
import { useState } from "react";
import Link from "next/link";

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

                    {/* Clients Dropdown */}
                    <li
                        className={`parent ${active === "clients" ? "active" : ""}`}
                        onClick={() => handleToggle("clients")}
                    >
                        <Link className="link" href="#">
                            <i className={`fas fa-minus ${active === "clients" ? "visible" : ""}`}></i>
                            Clients
                            <i className={`fas fa-plus ${active === "clients" ? "hidden" : ""}`}></i>
                        </Link>
                        <ul className="subnavigation">
                            <li><Link className="link" href="#">Burger King</Link></li>
                            <li><Link className="link" href="#">Southwest Airlines</Link></li>
                            <li><Link className="link" href="#">Levi Strauss</Link></li>
                        </ul>
                    </li>

                    {/* Services Dropdown */}
                    <li
                        className={`parent ${active === "services" ? "active" : ""}`}
                        onClick={() => handleToggle("services")}
                    >
                        <Link className="link" href="#">
                            <i className={`fas fa-minus ${active === "services" ? "visible" : ""}`}></i>
                            Services
                            <i className={`fas fa-plus ${active === "services" ? "hidden" : ""}`}></i>
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

            {/* Styled JSX CSS */}
            <style jsx>{`
        body {
          font-family: "Roboto", sans-serif;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(45deg, #ea4f4c 0%, #6d0019 100%);
        }

        .navigationWrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          background-color: #222;
          box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.25);
          color: white;
          text-transform: uppercase;
          overflow: hidden;
          width: 600px;
        }

        .logoWrapper {
          display: flex;
        }

        .stylish {
          font-weight: bold;
        }

        .logo {
          padding-left: 4px;
          color: #ea4f4c;
        }

        .navigation {
          display: flex;
          list-style-type: none;
        }

        .parent {
          padding: 0 10px;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
        }

        .link {
          position: relative;
          display: flex;
          align-items: center;
          text-decoration: none;
          transition: all 0.3s ease-in-out;
          color: white;
        }

        .link:hover {
          color: #ea4f4c;
        }

        .fas {
          color: #ea4f4c;
          margin: -2px 4px 0;
          font-size: 10px;
          transition: all 0.3s ease-in-out;
        }

        .fa-minus {
          opacity: 0;
          position: absolute;
          left: -16px;
          top: 3px;
          transition: all 0.3s ease-in-out;
        }

        .fa-plus {
          opacity: 1;
          transition: all 0.3s ease-in-out;
        }

        .hidden {
          opacity: 0 !important;
        }

        .visible {
          opacity: 1 !important;
        }

        .subnavigation {
          display: none;
          list-style-type: none;
          width: 500px;
          position: absolute;
          top: 40%;
          left: 25%;
          margin: auto;
          transition: all 0.3s ease-in-out;
          background-color: #222;
        }

        .subnavigation li a {
          font-size: 17px;
          padding: 0 5px;
        }

        .active {
          transform: translate(-40px, -25px);
        }

        .active .subnavigation {
          display: flex;
        }

        .active .fa-minus {
          opacity: 1 !important;
          font-size: 8px;
        }

        .active .fa-plus {
          opacity: 0 !important;
        }

        .active#clients .subnavigation {
          transform: translate(-150px, 17px);
        }

        .active#services .subnavigation {
          transform: translate(-290px, 17px);
        }

        .invisible {
          opacity: 0 !important;
          transform: translate(50px, 0);
        }
      `}</style>
        </>
    );
}
