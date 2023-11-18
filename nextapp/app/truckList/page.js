import React from "react";
import {
  Tdata,
  Ldata,
  distances,
  ascendingDistances,
  maxDistanceFilter,
} from "./getList.js";

export default function OtherPage() {
  const yellowPalette = {
    color: "black",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    margin: "0",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  };

  const thStyle = {
    paddingBottom: "10px",
    fontSize: "25px",
    textAlign: "left",
    width: "33%", // Equal width for each column (3 columns = 33.33% each)
    // You can adjust the percentage value based on the number of columns
  };

  const tdStyle = {
    fontSize: "20px",
    textAlign: "left",
    width: "33%", // Equal width for each column (3 columns = 33.33% each)
    // You can adjust the percentage value based on the number of columns
  };

  // Define a mapping of colors to truck IDs
  const colorMapping = {};

  // Function to generate a random color
  function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  function getColorForTruckId(truckId) {
    if (!colorMapping[truckId]) {
      colorMapping[truckId] = getRandomColor(); // Generate a color for new truck IDs
    }
    return colorMapping[truckId];
  }

  return (
    <main style={yellowPalette}>
      <div>
        <h2 style={{ fontSize: "30px" }}>Truck Data</h2>
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
        <h2 style={{ fontSize: "30px" }}>Load Data</h2>
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
        <h2 style={{ fontSize: "30px" }}>Distances</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Truck ID</th>
              <th style={thStyle}>Load ID</th>
              <th style={thStyle}>Distance (miles)</th>
            </tr>
          </thead>
          <tbody>
            {distances.map((pair, index) => (
              <tr key={`D${index}`}>
                <td style={tdStyle}>{pair.truck.id}</td>
                <td style={tdStyle}>{pair.load.id}</td>
                <td style={tdStyle}>{pair.distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 style={{ fontSize: "30px" }}>Ascending Distances</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Truck ID</th>
              <th style={thStyle}>Load ID</th>
              <th style={thStyle}>Distance (miles)</th>
            </tr>
          </thead>
          <tbody>
            {ascendingDistances.map((pair, index) => (
              <tr key={`D${index}`}>
                <td style={tdStyle}>{pair.truck.id}</td>
                <td style={tdStyle}>{pair.load.id}</td>
                <td style={tdStyle}>{pair.distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <h2 style={{ fontSize: "30px" }}>
          Max Distance Filter Ascending Distances
        </h2>
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
              const rowColor = getColorForTruckId(pair.truck.id); // Get color for the current truck ID
              return (
                <tr key={`D${index}`}>
                  <td style={{ ...tdStyle, color: rowColor }}>
                    {pair.truck.id}
                  </td>
                  <td style={{ ...tdStyle, color: rowColor }}>
                    {pair.load.id}
                  </td>
                  <td style={{ ...tdStyle, color: rowColor }}>
                    {pair.distance}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
