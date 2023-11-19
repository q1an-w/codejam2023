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


  return (
    <main id="main-body" style={{ position: "relative" }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "40px",
          position: "absolute",
          top: "240px" /* Adjust this value to move the h1 up */,
          width: "100%" /* Ensure h1 spans the full width */,
        }}
      >
        Log In
      </h1>
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
        <div className="input-group" style={{ textAlign: "center" }}>
          <input
            type="submit"
            id="submit-button"
            value="Submit"
          />
        </div>
      </form>
    </main>
  );
}
