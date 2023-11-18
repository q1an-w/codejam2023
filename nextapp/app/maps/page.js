// "use client";
// import React, { useEffect, useState } from "react";

// export default function Maps() {
//   const [load, setLoad] = useState([]);
//   const fetchData = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/api/getLoads");
//       const result = await response.json();
//       setLoad(result);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAKxCpR8daQzrrMy8a9Z4MKhrdZV2CsaUI`; // Replace YOUR_API_KEY with your Google Maps API key
//     script.async = true;
//     document.body.appendChild(script);

//     script.onload = () => {
//       const map = new window.google.maps.Map(document.getElementById("map"), {
//         center: { lat: 45.5017, lng: -73.5673 }, // Montreal coordinates
//         zoom: 11,
//       });

//       const addMarker = (location) => {
//         new window.google.maps.Marker({
//           position: location,
//           map: map,
//         });
//       };

//       // Function to manually add markers around Montreal
//       const addMontrealMarkers = () => {
//         fetchData();
//         const montrealMarkers = load.map(
//           ({ originLatitude, originLongitude }) => ({
//             lat: originLatitude,
//             lng: originLongitude,
//           })
//         );
//         // Array of manually added coordinates around Montreal
//         // const montrealMarkers = [
//         //   { lat: 45.52, lng: -73.55 },
//         //   { lat: 45.51, lng: -73.57 },
//         //   { lat: 45.5, lng: -73.56 },
//         // ];

//         montrealMarkers.forEach((marker) => {
//           addMarker(marker);
//         });
//       };

//       // Call function to add manual markers after map is loaded
//       addMontrealMarkers();
//     };
//   }, []);

//   return (
//     <div>
//       <div
//         id="map"
//         style={{
//           marginTop: "50px",
//           margin: "auto",
//           width: "50%", // Adjusted width to fill the available space
//           height: "800px", // Reduced height for better visibility
//           border: "4px solid black", // Adjusted border size
//         }}
//       ></div>
//     </div>
//   );
// }
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
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAKxCpR8daQzrrMy8a9Z4MKhrdZV2CsaUI`; // Replace YOUR_API_KEY with your Google Maps API key
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 45.5017, lng: -73.5673 }, // Montreal coordinates
        zoom: 11,
      });

      // Call function to add manual markers after map is loaded
      addMontrealMarkers(map);
    };
  }, [load]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <div>
      <div
        id="map"
        style={{
          marginTop: "50px",
          margin: "auto",
          width: "50%",
          height: "800px",
          border: "4px solid black",
        }}
      ></div>
    </div>
  );
}
