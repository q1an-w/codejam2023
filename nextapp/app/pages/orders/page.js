import React from "react";
import "../../main.css";
import "../../secondbody.css";
import whitelogo from "../../imgs/logo white background.png";
import Image from "next/image";

export default function OHistory() {
  return (
    <main>
      <link
        href="https://fonts.googleapis.com/css?family=Odor Mean Chey"
        rel="stylesheet"
      />
      <Image src={whitelogo} className="logoup" alt="image" />
      <div className="order-div">
        {" "}
        <p className="upper-text"> Order History </p>{" "}
      </div>

      <div className="historyorder">No orders</div>
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
