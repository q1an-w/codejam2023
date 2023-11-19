import React from "react";
import "../../main.css";
import "./style.css";
import whitelogo from "../../imgs/logo white background.png";
import Image from "next/image";
import pfp from "./mikesanders.png";

export default function Profile() {
  const name = "Mike Sanders"; // change to fetch user full name
  const age = 41; // change to fetch user age
  const phone = "(514) 866-6686"; // change to fetch user phone#
  const license = "954-TMD";
  const maxload = 36287;
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

      <div class="div"></div>
      <div class="profile-heading2">Personal information</div>
      <div class="profile-box">
        <div class="profile-heading">Name</div>
        <div className="input-group" id="input-group-section">
          <input type="text" id="text-input" placeholder={name} required />
        </div>
        <div class="profile-heading">Age</div>
        <div className="input-group" id="input-group-section">
          <input type="text" id="text-input" placeholder={age} required />
        </div>

        <div class="profile-heading">Phone number</div>
        <div className="input-group" id="input-group-section">
          <input type="text" id="text-input" placeholder={phone} required />
        </div>
      </div>

      <div class="div"></div>
      <div class="profile-heading2">Truck information</div>
      <div class="profile-box2">
        <div class="profile-heading">License plate</div>
        <div className="input-group" id="input-group-section">
          <input type="text" id="text-input" placeholder={license} required />
        </div>
        <div class="profile-heading">Maximum load</div>
        <div className="input-group" id="input-group-section">
          <input
            type="text"
            id="text-input"
            placeholder={maxload + " kg"}
            required
          />
        </div>
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
