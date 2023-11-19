import React from "react";
import "../../main.css";
import "../../secondbody.css";
import whitelogo from "../../imgs/logo white background.png";
import { Bell, User, Home, Box } from "react-feather";
import Image from "next/image";

const iconStyleLeft = {
  color: "#3F3F3F",
  position: "absolute",
  top: "5%",
  left: "10%",
  zIndex: "9999",
};

const iconStyleSlightLeft = {
  color: "#3F3F3F",
  position: "absolute",
  top: "5%",
  left: "31%",
  zIndex: "9999",
};

const iconStyleRight = {
  color: "#3F3F3F",
  position: "absolute",
  top: "5%",
  right: "20%",
  zIndex: "9999",
};

const iconStyleSlightRight = {
  color: "#000000",
  position: "absolute",
  top: "5%",
  right: "40%",
  zIndex: "9999",
};

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
        <a href="/home">
          <Home size={45} style={iconStyleLeft} />
        </a>
        <a href="/boxes">
          <Box size={45} style={iconStyleSlightLeft} />
        </a>
        <div className="div-icon">
          <a href="/notifications">
            <Bell size={45} style={iconStyleSlightRight} />
          </a>
        </div>
        <a href="/profile">
          <User size={45} style={iconStyleRight} />
        </a>
      </div>
    </main>
  );
}
