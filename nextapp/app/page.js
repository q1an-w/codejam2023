"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import "./main.css";
import yellowlogo from "./imgs/logo yellow background.png";
import Image from "next/image";

export default function Home() {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // Simulate click after component mounts
    setTimeout(() => {
      setClicked(true);
      setTimeout(() => {
        // Navigate to /home after animation
        window.location.href = "/home";
      }, 1000); // 750 milliseconds = 0.75 seconds
    }, 0); // Delay before simulating click, adjust as needed
  }, []);

  return (
    <main>
      <link
        href="https://fonts.googleapis.com/css?family=Odor Mean Chey"
        rel="stylesheet"
      />
      <div className="welcome-div">
        <p className="welcome-text">Welcome</p>
        <p className="welcome-text">to</p>
      </div>
      <Image
        src={yellowlogo}
        className={clicked ? "img bounce" : "img"}
        alt="image"
        onClick={() => {}}
      />
    </main>
  );
}
