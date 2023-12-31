"use client";
import React from "react";
import Link from "next/link";
import { Button } from "react";
import yellowlogo from "../../imgs/logo yellow background.png";
import whitelogo from "../../imgs/logo white background.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./login.css";
import "../../main.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
async function postData(userId) {
  try {
    const response = await fetch("/your-api-endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    console.log("Result from server:", result);

    // Handle the result as needed
  } catch (error) {
    console.error("Error:", error);
    // Handle errors
  }
}
export const Login = () => {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const userID = e.target.userID.value.trim().toLowerCase(); // Access the userID from the form

    if (userID === "admin") {
      router.push("../rundata");
      // } else if (Tdata.some((truck) => truck.id.toLowerCase() === userID)) {
      //   router.push("/truckList");
      // } else if (typeof Number(userID) === "number" && !isNaN(userID)) {
      //   // postData(userID);
      //   localStorage.setItem("userID", userID);
      //   //console.log(userID);
      //   router.push("/maps");
      // } else {
      //   console.log("User is not admin or a truck");
      // }
    } else if (typeof Number(userID) === "number" && !isNaN(userID)) {
      // postData(userID);
      localStorage.setItem("userID", userID);

      // // Make a request to the server with the userID
      // fetch(`/api/setUserID?userID=${userID}`, {
      //   method: "POST", // You can use 'GET' or 'POST' depending on your server-side implementation
      // });

      //console.log(userID);
      router.push("/maps");
    } else {
      console.log("User is not admin or a truck");
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      {""}
      <login>
        <Slider {...settings}>
          <div>
            <main>
              <link
                href="https://fonts.googleapis.com/css?family=Odor Mean Chey"
                rel="stylesheet"
              />
              <div class="welcome-div">
                <p class="welcome-text">Welcome</p>
                <p class="welcome-text">to</p>
              </div>
              <Image src={yellowlogo} className="img" alt="image" />
            </main>
          </div>
          <div>
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
            <div class="login-div"></div>
          </div>
        </Slider>
      </login>
    </div>
  );
};

export default Login;
