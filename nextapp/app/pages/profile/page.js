import React from "react";
import "../../main.css";
import whitelogo from "../../imgs/logo white background.png";
import Image from "next/image";

export default function Profile() {
  return (
    <main id="2p">
      <link
        href="https://fonts.googleapis.com/css?family=Odor Mean Chey"
        rel="stylesheet"
      />
      <Image src={whitelogo} className="logoup" alt="image" />
      <div className="profile-div">hellloo</div>

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
