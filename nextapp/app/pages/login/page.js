"use client";
import React from "react";
import Link from "next/link";
import { Button } from "react";
import yellowlogo from "../../imgs/logo yellow background.png";
import whitelogo from "../../imgs/logo white background.png";
import Image from "next/image";
import { useRouter } from "next/router";
import "./login.css";

export const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const userID = e.target.userID.value.trim().toLowerCase(); // Access the userID from the form

    if (userID === "admin") {
      router.push("/truckList");
    }
    // else if (Tdata.some((truck) => truck.id.toLowerCase() === userID)) {
    //   router.push('/truckList');
    // }
    else {
      console.log("User is not admin or a truck");
    }
  };
  return (
    <div>
      {""}
      <login>
        <link
          href="https://fonts.googleapis.com/css?family=Odor Mean Chey"
          rel="stylesheet"
        />
        <Image src={yellowlogo} className="login-logo" alt="image" />
        <div class="login-div"></div>
        <div class="login-title">Login</div>
        <div class="login-box">
          {" "}
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
            <div class="login-div3"></div>
            <div className="input-group">
              <input type="submit" id="submit-button" value="Submit" />
            </div>
          </form>
        </div>
        <div class="login-div2"></div>
      </login>
    </div>
  );
};

export default Login;
