import React from "react";
import "../../main.css";
import whitelogo from "../../imgs/logo white background.png";
import { Bell, User, Home, Box } from "react-feather";
import Image from "next/image";
import "../../secondbody.css";

import Notifications from "../notifications/page";

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
  right: "17%",
  zIndex: "9999",
};

const iconStyleSlightRight = {
  color: "#000000",
  position: "absolute",
  top: "5%",
  right: "55%",
  left: "50%",
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

      <div className="orders-avail">
        {" "}
        <p className="second-text">Orders Available for You</p>{" "}
      </div>
      <br></br>

      <div className="notification-txt">
        <li className="notification-txt">Order #909 is available around you</li>
        <hr className="line"></hr>
        <li className="notification-txt">Order #904 is available around you</li>
        <hr className="line"></hr>
        <li className="notification-txt">Order #688 is available around you</li>
        <hr className="line"></hr>
        <li className="notification-txt">
          Order #584 is available around you.
        </li>
      </div>

      <div className="allorders">
        {" "}
        <p className="upper-text">All available orders</p>{" "}
      </div>
      <br></br>

      <div className="notification-txt">
        <li className="notification-txt">Order #908 available for pick up</li>
        <hr className="line"></hr>
        <li className="notification-txt">Order 907 available for pick up</li>
        <hr className="line"></hr>
        <li className="notification-txt">Order #906 is available around you</li>
        <hr className="line"></hr>
      </div>

      <div className="navbar">
        <a href="/maps" style={iconStyleLeft} className="dev-noicon">
          <Home size={45} style={iconStyleLeft} />
        </a>
        <a
          href="/pages/orders"
          style={iconStyleSlightLeft}
          className="dev-noicon"
        >
          <Box size={45} style={iconStyleSlightLeft} />
        </a>

        <a
          href="/pages/notifications"
          style={iconStyleSlightRight}
          className="dev-icon"
        >
          <Bell size={45} style={iconStyleSlightRight} />
        </a>
        <div className="div-icon"> </div>

        <a href="/pages/profile" style={iconStyleRight} className="dev-noicon">
          <User size={45} style={iconStyleRight} />
        </a>
      </div>
    </main>
  );
}
