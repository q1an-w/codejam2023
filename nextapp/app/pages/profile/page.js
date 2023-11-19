// import React from "react";
// import "../../main.css";
// import whitelogo from "../../imgs/logo white background.png";
// import { Bell, User, Home, Box } from "react-feather";
// import Image from "next/image";
// import pfp from "./mikesanders.png";
// // const Orders = () => {
// //   return <div>Orders</div>;
// // };

// // export default Orders;

// const iconStyleLeft = {
//   color: "#333",
//   position: "absolute",
//   top: "5px",
//   left: "25px",
//   zIndex: "9999",
// };

// const iconStyleSlightLeft = {
//   color: "#333",
//   position: "absolute",
//   top: "5px",
//   left: "115px",
//   zIndex: "9999",
// };

// const iconStyleRight = {
//   color: "#333",
//   position: "absolute",
//   top: "5px",
//   right: "68px",
//   zIndex: "9999",
// };

// const iconStyleSlightRight = {
//   color: "#333",
//   position: "absolute",
//   top: "5px",
//   right: "155px",
//   zIndex: "9999",
// };

// export default function Profile() {
//   const name = "Mike Sanders"; // change to fetch user full name
//   const age = 41; // change to fetch user age
//   const phone = "(514) 866-6686"; // change to fetch user phone#
//   const license = "954-TMD";
//   const maxload = 36287;
//   return (
//     <main id="2p">
//       <link
//         href="https://fonts.googleapis.com/css?family=Odor Mean Chey"
//         rel="stylesheet"
//       />
//       <Image src={whitelogo} className="logoup" alt="image" />
//       <div className="profile-div">
//         <div className="profile-name">{name}</div>
//         <Image src={pfp} className="pfp" alt="image" />
//       </div>

//       <div class="div"></div>
//       <div class="profile-heading2">Personal information</div>
//       <div class="profile-box">
//         <div class="profile-heading">Name</div>
//         <div className="input-group" id="input-group-section">
//           <input type="text" id="text-input" placeholder={name} required />
//         </div>
//         <div class="profile-heading">Age</div>
//         <div className="input-group" id="input-group-section">
//           <input type="text" id="text-input" placeholder={age} required />
//         </div>

//         <div class="profile-heading">Phone number</div>
//         <div className="input-group" id="input-group-section">
//           <input type="text" id="text-input" placeholder={phone} required />
//         </div>
//       </div>

//       <div class="div"></div>
//       <div class="profile-heading2">Truck information</div>
//       <div class="profile-box2">
//         <div class="profile-heading">License plate</div>
//         <div className="input-group" id="input-group-section">
//           <input type="text" id="text-input" placeholder={license} required />
//         </div>
//         <div class="profile-heading">Maximum load</div>
//         <div className="input-group" id="input-group-section">
//           <input
//             type="text"
//             id="text-input"
//             placeholder={maxload + " kg"}
//             required
//           />
//         </div>
//       </div>

//       <div className="navbar">
//         <a href="#home" class="active">
//           Home
//         </a>
//         <a href="#news">News</a>
//         <a href="#contact">Contact</a>
//         <a href="/maps">
//           <Home size={60} style={iconStyleLeft} />
//         </a>
//         <a href="/pages/orders">
//           <Box size={60} style={iconStyleSlightLeft} />
//         </a>
//         <a href="/pages/notifications">
//           <Bell size={60} style={iconStyleSlightRight} />
//         </a>
//         <a href="/pages/profile">
//           <User size={60} style={iconStyleRight} />
//         </a>
//       </div>
//     </main>
//   );
// }
import React from "react";
import "../../main.css";
import "./style.css";
import { Bell, User, Home, Box } from "react-feather";
import whitelogo from "../../imgs/logo white background.png";
import Image from "next/image";
import pfp from "./mikesanders.png";
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

export default function Profile() {
  const name = "Mike Sanders"; // change to fetch user full name
  const age = 41; // change to fetch user age
  const phone = "(514) 866-6686"; // change to fetch user phone#
  const license = "954-TMD";
  const maxload = 36287;
  return (
    <main id="2p">
      <link
        href="https://fonts.googleapis.com/css?family=Odor Mean Chey"
        rel="stylesheet"
      />
      <Image src={whitelogo} className="logoup" alt="image" />
      <div className="profile-div">
        <Image src={pfp} className="pfp" alt="image" />
        <div className="profile-name">
          {name}
          <div className="deliveries"> 0 deliveries</div>
        </div>
      </div>

      <div class="div"></div>
      <div class="profile-heading2">Personal information</div>
      <div class="profile-box">
        <div class="profile-heading">Name</div>
        <div className="input-group" id="input-group-section">
          <input type="text" id="text-input" placeholder={name} required />
        </div>
        <div class="profile-heading">Age</div>
        <div className="input-group" id="input-group-section">
          <input type="text" id="text-input" placeholder={age} required />
        </div>

        <div class="profile-heading">Phone number</div>
        <div className="input-group" id="input-group-section">
          <input type="text" id="text-input" placeholder={phone} required />
        </div>
      </div>

      <div class="div"></div>
      <div class="profile-heading2">Truck information</div>
      <div class="profile-box2">
        <div class="profile-heading">License plate</div>
        <div className="input-group" id="input-group-section">
          <input type="text" id="text-input" placeholder={license} required />
        </div>
        <div class="profile-heading">Maximum load</div>
        <div className="input-group" id="input-group-section">
          <input
            type="text"
            id="text-input"
            placeholder={maxload + " kg"}
            required
          />
        </div>
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
