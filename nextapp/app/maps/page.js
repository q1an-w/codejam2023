"use client";
import React, { useEffect, useState } from "react";

export default function Maps() {
  const [load, setLoad] = useState([]);

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
        zoom: 8,
      });

      // Call function to add manual markers after map is loaded
      addMontrealMarkers(map);
    };
  }, [load]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const Palette = {
    width: "100%",
    margin: "auto",
    color: "black",
    fontFamily: "Arial, sans-serif",
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
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

        <div style={{ height: "400px", width: "95%", margin: "auto" }}>
          <div
            id="map"
            style={{
              height: "100%", // Adjusted height to fill the available space
              border: "4px solid black", // Adjusted border size
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
