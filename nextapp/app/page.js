import Link from "next/link";
import "./main.css";
import yellowlogo from "./imgs/logo yellow background.png";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <link
        href="https://fonts.googleapis.com/css?family=Odor Mean Chey"
        rel="stylesheet"
      />
      <div className="welcome-div">
        <p className="welcome-text">Welcome</p>
        <p className="welcome-text">to</p>
      </div>
      <Image src={yellowlogo} className="img" alt="image" />
    </main>
  );
}
