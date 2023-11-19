import React from "react";
import "../../main.css";
import whitelogo from "../../imgs/logo white background.png";
import { Bell, User, Home, Box } from "react-feather";
import Image from "next/image";
// const Orders = () => {
//   return <div>Orders</div>;
// };

// export default Orders;

const iconStyleLeft = {
  position: "absolute",
  top: "5px",
  left: "25px",
  zIndex: "9999",
};

const iconStyleSlightLeft = {
  position: "absolute",
  top: "5px",
  left: "115px",
  zIndex: "9999",
};

const iconStyleRight = {
  position: "absolute",
  top: "5px",
  right: "68px",
  zIndex: "9999",
};

const iconStyleSlightRight = {
  position: "absolute",
  top: "5px",
  right: "155px",
  zIndex: "9999",
};

export default function OHistory() {
  return (
    <main id="2p">
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
        <a href="/home">
          <Home size={60} style={iconStyleLeft} />
        </a>
        <a href="/boxes">
          <Box size={60} style={iconStyleSlightLeft} />
        </a>
        <a href="/notifications">
          <Bell size={60} style={iconStyleSlightRight} />
        </a>
        <a href="/profile">
          <User size={60} style={iconStyleRight} />
        </a>
      </div>
    </main>
  );
}
