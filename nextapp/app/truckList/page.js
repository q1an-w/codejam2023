import React from "react";
import {
  Tdata,
  Ldata,
  distances,
  ascendingDistances,
  maxDistanceFilter,
} from "./getList.js";

export default function OtherPage() {
  const Palette = {
    width: "80%",
    margin: "auto",
    color: "black",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const tableStyle = {
    margin: "auto",
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    border: "2px solid #ddd",
    overflowX: "auto",
  };

  const thStyle = {
    padding: "12px",
    fontSize: "20px",
    textAlign: "center",
    border: "2px solid #ddd",
  };

  const tdStyle = {
    color: "black",
    padding: "10px",
    fontSize: "18px",
    textAlign: "center",
    border: "1px solid #ddd",
  };

  const colorMap = {};

  const getColorForTruckId = (truckId) => {
    if (!colorMap[truckId]) {
      colorMap[truckId] = getRandomColor();
    }
    return colorMap[truckId];
  };

  const getRandomColor = () => {
    let colorList = [
      "#FFB380", "#FFD9B3", "#FFB3FF", "#FFFFCC", "#B3E6FF",
      "#FFD699", "#B3B3FF", "#CCCCB3", "#CCFFCC", "#FFCCCC",
      "#CCFF99", "#CCFF66", "#FFCCCC", "#B3CCFF", "#CCFF99",
      "#FFCCFF", "#E6FF99", "#FF99B3", "#FFB3B3", "#B3FFE6",
      "#CCFFCC", "#E6B3FF", "#CCFF66", "#FFB380", "#E6B3E6",
      "#B3B3CC", "#FFB3FF", "#FFCCFF", "#B3E6FF", "#B3FFCC",
      "#FFD9E6", "#CCFFFF", "#FFE6FF", "#FFFF99", "#E6CCFF",
      "#FFD9FF", "#CCFF99", "#FFCC99", "#FFB3D9", "#FF99CC",
      "#FFFFB3", "#E6FFB3", "#B3FFD9", "#FFD9B3", "#D9FFFF"
    ];
    
    const getRandomColor = () => {
      if (colorList.length === 0) {
        // If all colors have been used, reset the colorList (optional)
        // You may choose to return null or handle it differently based on your requirements
        colorList = [
          // The entire list of colors including the newly added pastel colors
        ];
      }
    
      const randomIndex = Math.floor(Math.random() * colorList.length);
      const selectedColor = colorList[randomIndex];
      colorList.splice(randomIndex, 1); // Remove the selected color from the list
      return selectedColor;
    };
    
    const generateRowColor = (truckId) => {
      const color = getRandomColor();
      if (!color) {
        // Handle the case when all colors have been used (optional)
        // You may return a default color or handle it differently based on your requirements
        return { backgroundColor: "#FFFFFF", color: "#000000", textAlign: "center" };
      }
      return { backgroundColor: color, color: "#fff", textAlign: "center" };
    };
    
    // Example usage:
    // Replace 'someTruckId' with the actual ID you want to generate color for
    const truckId = 'someTruckId';
    const rowStyle = generateRowColor(truckId);
    
    const randomIndex = Math.floor(Math.random() * colorList.length);
    return colorList[randomIndex];
  };

  const generateRowColor = (truckId) => {
    const color = getColorForTruckId(truckId);
    return { backgroundColor: color, color: "#fff", textAlign: "center" };
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
          Admin Dashboard
        </h1>

        <div style={{ width: "100%" }}>
          <div style={{ marginBottom: "30px", overflowX: "auto" }}>
            <h2 style={{ fontSize: "30px", marginBottom: "10px" }}>
              Truck Data
            </h2>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Latitude</th>
                  <th style={thStyle}>Longitude</th>
                </tr>
              </thead>
              <tbody>
                {Tdata.map((data, index) => (
                  <tr key={`T${index}`}>
                    <td style={tdStyle}>{data.id}</td>
                    <td style={tdStyle}>{data.latitude}</td>
                    <td style={tdStyle}>{data.longitude}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginBottom: "30px", overflowX: "auto" }}>
            <h2 style={{ fontSize: "30px", marginBottom: "10px" }}>
              Load Data
            </h2>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Latitude</th>
                  <th style={thStyle}>Longitude</th>
                </tr>
              </thead>
              <tbody>
                {Ldata.map((data, index) => (
                  <tr key={`L${index}`}>
                    <td style={tdStyle}>{data.id}</td>
                    <td style={tdStyle}>{data.latitude}</td>
                    <td style={tdStyle}>{data.longitude}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Max Distance Filter Ascending Distances table */}
        <h2 style={{ fontSize: "30px", marginBottom: "10px" }}>
          Max Distance Filter Ascending Distances
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Truck ID</th>
                <th style={thStyle}>Load ID</th>
                <th style={thStyle}>Distance (miles)</th>
              </tr>
            </thead>
            <tbody>
              {maxDistanceFilter.map((pair, index) => {
                const rowColor = generateRowColor(pair.truck.id);
                return (
                  <tr key={`D${index}`} style={rowColor}>
                    <td style={tdStyle}>{pair.truck.id}</td>
                    <td style={tdStyle}>{pair.load.id}</td>
                    <td style={tdStyle}>{pair.distance}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
