"use client";
import { useRouter } from "next/navigation";
import "../main.css";
import "../firstbody.css";
import yellowlogo from "../imgs/logo yellow background.png";
// import "./map.css";
import React, { useEffect, useState } from "react";
import { Bell, User, Home, Box } from "react-feather";
import Image from "next/image";
export default function Maps() {
  const [user, setUser] = useState({
    positionLatitude: 45.5,
    positionLongitude: -73.5,
  });
  const [load, setLoad] = useState([]);
  const [zoom, setZoom] = useState(6);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/getLoads");
      const result = await response.json();
      setLoad(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getCenterData = async () => {
    try {
      const userID = localStorage.getItem("userID");
      const response = await fetch(`/api/getCenter?userID=${userID}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
      const result = await response.json();

      console.log(result);
      setUser(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addMarker = (location, map) => {
    new window.google.maps.Marker({
      position: location,
      map: map,
    });
  };

  const addMontrealMarkers = (map) => {
    load.forEach(({ originLatitude, originLongitude }) => {
      const markerLocation = { lat: originLatitude, lng: originLongitude };
      addMarker(markerLocation, map);
    });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAKxCpR8daQzrrMy8a9Z4MKhrdZV2CsaUI`; // Replace with your Google Maps API key
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: user.positionLatitude, lng: user.positionLongitude }, // Montreal coordinates
        zoom: 8,

        styles: [
          { elementType: "geometry", stylers: [{ color: "#485c6c" }] },
          {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#e3bfdd" }],
          },
          { elementType: "labels.text.fill", stylers: [{ color: "#8c437f" }] },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ color: "#9a8db8" }],
          },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "##e092d2" }],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "##e092d2" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#40555a" }],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#e092d2" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#576269" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#3a4552" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#e092d2" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#8c7b78" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#2e3848" }],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#e092d2" }],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#3f4b5a" }],
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#e092d2" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#253a4d" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#e092d2" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#e092d2" }],
          },
        ],
      });

      addMontrealMarkers(map);
    };
  }, [load, zoom, user]);

  useEffect(() => {
    fetchData();
    getCenterData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const handleZoomChange = (event) => {
    setZoom(parseInt(event.target.value, 10));
  };

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
  const xStyle = {
    color: "#333",
    position: "absolute",
    top: "470px",
    left: "30px",
    zIndex: "9999",
    fontSize: `100px`,
  };

  const checkStyle = {
    color: "#333",
    position: "absolute",
    top: "470px",
    right: "40px",
    zIndex: "9999",
    fontSize: `100px`,
  };

  const Palette = {
    width: "100%",
    margin: "auto",
    color: "black",
    fontFamily: "Arial, sans-serif",
    position: "relative",
  };

  return (
    <div style={{ position: "relative", background: "#FFD234" }}>
      <div style={Palette}>
        <Image src={yellowlogo} className="logoup" alt="image" />

        <div
          style={{
            height: "400px",
            width: "95%",
            margin: "auto",
            position: "relative",
          }}
        >
          <div
            id="map"
            style={{
              marginTop: "2vh",
              height: "68vh",
              border: "4px solid black",
              position: "relative",
            }}
          ></div>
          <input
            type="range"
            min="1"
            max="15"
            value={zoom}
            onChange={handleZoomChange}
            style={{ width: "80%", margin: "15px auto", display: "block" }}
          />
          {/* // <a href="">
          //   <X size={30} style={xStyle} />
          // </a> */}
          {/* <a href="">
            <Check size={30} style={checkStyle} />
          </a> */}
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

            <a
              href="/pages/profile"
              style={iconStyleRight}
              className="dev-noicon"
            >
              <User size={45} style={iconStyleRight} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
