"use client";
import React, { useEffect } from "react";

export default function Maps() {
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

      const addMarker = (location) => {
        new window.google.maps.Marker({
          position: location,
          map: map,
        });
      };

      // Function to manually add markers around Montreal
      const addMontrealMarkers = () => {
        // Array of manually added coordinates around Montreal
        const montrealMarkers = [
          { lat: 45.52, lng: -73.55 },
          { lat: 45.51, lng: -73.57 },
          { lat: 45.5, lng: -73.56 },
        ];

        montrealMarkers.forEach((marker) => {
          addMarker(marker);
        });
      };

      // Call function to add manual markers after map is loaded
      addMontrealMarkers();
    };
  }, []);

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
