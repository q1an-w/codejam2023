import React from "react";
import Link from "next/link";
import yellowlogo from "../../imgs/logo yellow background.png";
import whitelogo from "../../imgs/logo white background.png";
import Image from "next/image";
import "./login.css";

export const Login = () => {
  return (
    <div>
      {" "}
      <login>
        <link
          href="https://fonts.googleapis.com/css?family=Odor Mean Chey"
          rel="stylesheet"
        />
        <Image src={yellowlogo} className="login-logo" alt="image" />
        <div class="login-div"></div>
        <div class="login-title">Login</div>
        <div class="login-box"></div>
        <div class="login-div2"></div>
        <div class="login-submit"></div>
      </login>
    </div>
  );
};

export default Login;
