"use client";
import React, { useEffect, useState } from "react";
import { Bell, User, Home, Box } from 'react-feather';

export default function Maps() {
  const [load, setLoad] = useState([]);
  const [zoom, setZoom] = useState(8);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/getLoads");
      const result = await response.json();
      setLoad(result);
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
        center: { lat: 45.5017, lng: -73.5673 }, // Montreal coordinates
        zoom: zoom,
      });

      addMontrealMarkers(map);
    };
  }, [load, zoom]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleZoomChange = (event) => {
    setZoom(parseInt(event.target.value, 10));
  };

  const iconStyleLeft = {
    position: "absolute",
    top: "658px",
    left: "8px",
    zIndex: "9999",
    fontSize: `20px`
  };

  const iconStyleSlightLeft = {
    position: "absolute",
    top: "658px",
    left: "98px",
    zIndex: "9999",
    fontSize: `20px`
  };

  const iconStyleRight = {
    position: "absolute",
    top: "658px",
    right: "8px",
    zIndex: "9999",
    fontSize: `100px`
  };

  const iconStyleSlightRight = {
    position: "absolute",
    top: "658px",
    right: "98px",
    zIndex: "9999",
    fontSize: `100px`
  };

  const Palette = {
    width: "100%",
    margin: "auto",
    color: "black",
    fontFamily: "Arial, sans-serif",
    position: "relative",
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={Palette}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "40px",
            marginBottom: "20px",
          }}
        >
          Load Finder
        </h1>

        <div style={{ height: "400px", width: "95%", margin: "auto", position: "relative" }}>
          <div
            id="map"
            style={{
              height: "calc(100% - 50px)", // Adjust height to accommodate the slider
              border: "4px solid black",
              position: "relative",
            }}
          ></div>
          <input
            type="range"
            min="1"
            max="20"
            value={zoom}
            onChange={handleZoomChange}
            style={{ width: "80%", margin: "20px auto", display: "block" }}
          />
          <a href="/home">
            <Home size={60} style={iconStyleLeft} />
          </a>
          <a href="/boxes">
            <Box size={60} style={iconStyleSlightLeft} />
          </a>
          <a href="/notifications">
            <Bell size={60} style={iconStyleSlightRight} />
          </a>
          <a href="/profile">
            <User size={60} style={iconStyleRight} />
          </a>
        </div>
      </div>
    </div>
  );
}
