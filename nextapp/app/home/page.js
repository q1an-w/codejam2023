"use client"


import { useRouter } from "next/navigation";
import React from "react";
import "./style.css";

export default function Home() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userID = e.target.userID.value.trim().toLowerCase(); // Access the userID from the form


    if (userID === 'admin') {
      router.push('/truckList');
    } 
    else {
      router.push('/maps');

    }
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
      </div>
    </main>
  );
}
