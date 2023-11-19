import Link from "next/link";
import "./main.css";
import yellowlogo from "./imgs/logo yellow background.png";
import Image from "next/image";

import { connectToMQTTBroker } from "./filtering/filter";

export default function Home() {
  const client = connectToMQTTBroker();
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
      <Link href="./pages/login">Begin</Link>
    </main>
  );
}
