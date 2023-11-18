'use client'
// const { readFileSync } = require("fs");
// const dataTrucks = readFileSync("./app/truckList/trucks.json", "utf8");
// const parsedDataT = JSON.parse(dataTrucks);

// // Extracting truck IDs
// const Tdata = parsedDataT.map((truck) => ({
//   id: truck.truckId,
// }));

import { useRouter } from 'next/navigation';
import React from 'react';
import './style.css';

export default function Home() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userID = e.target.userID.value.trim().toLowerCase(); // Access the userID from the form

    if (userID === 'admin') {
      router.push('/truckList');
    } 
    // else if (Tdata.some((truck) => truck.id.toLowerCase() === userID)) {
    //   router.push('/truckList');
    // }
    else {
      console.log('User is not admin or a truck');
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