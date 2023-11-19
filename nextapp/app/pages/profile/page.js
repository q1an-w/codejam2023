import React from "react";
import "../../main.css";
import whitelogo from "../../imgs/logo white background.png";
import Image from "next/image";
import pfp from "./mikesanders.png";

export default function Profile() {
  const name = "Mike Sanders"; // change to fetch user full name
  return (
    <main id="2p">
      <link
        href="https://fonts.googleapis.com/css?family=Odor Mean Chey"
        rel="stylesheet"
      />
      <Image src={whitelogo} className="logoup" alt="image" />
      <div className="profile-div">
        <div className="profile-name">{name}</div>
        <Image src={pfp} className="pfp" alt="image" />
      </div>

      <div className="navbar">
        <a href="#home" class="active">
          Home
        </a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
      </div>
    </main>
  );
}
