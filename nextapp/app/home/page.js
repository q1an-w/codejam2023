"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Bell, User, Home, Box } from "react-feather";
import "./style.css";

export default function Homepage() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userID = e.target.userID.value.trim().toLowerCase(); // Access the userID from the form

    if (userID === "admin") {
      router.push("/truckList");
    } else if (Number.isInteger(Number(userID))) {
      router.push("/maps");
    }
    // Add more conditions if needed
    else {
      console.log("error");
    }
  };

  const iconStyleLeft = {
    color: "#333",
    position: "absolute",
    top: "750px",
    left: "25px",
    zIndex: "9999",
    fontSize: `20px`,
  };

  const iconStyleSlightLeft = {
    color: "#333",
    position: "absolute",
    top: "750px",
    left: "115px",
    zIndex: "9999",
    fontSize: `20px`,
  };

  const iconStyleRight = {
    color: "#333",
    position: "absolute",
    top: "750px",
    right: "25px",
    zIndex: "9999",
    fontSize: `100px`,
  };

  const iconStyleSlightRight = {
    color: "#333",
    position: "absolute",
    top: "750px",
    right: "115px",
    zIndex: "9999",
    fontSize: `100px`,
  };

  return (
    <main id="main-body">
      <div className="container" id="main-container">
        <h1 id="main-heading">Welcome to DriverUp</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group" id="input-group-section">
            <input
              type="text"
              id="text-input"
              name="userID"
              placeholder="Enter User ID"
              required
            />
          </div>
          <div className="input-group">
            <input type="submit" id="submit-button" value="Submit" />
          </div>
        </form>
        <a href="/home">
          <Home size={60} style={iconStyleLeft} />
        </a>
        <a href="/pages/orders">
          <Box size={60} style={iconStyleSlightLeft} />
        </a>
        <a href="/pages/notifications">
          <Bell size={60} style={iconStyleSlightRight} />
        </a>
        <a href="/pages/profile">
          <User size={60} style={iconStyleRight} />
        </a>
      </div>
    </main>
  );
}
