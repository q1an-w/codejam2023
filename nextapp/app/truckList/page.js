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
    width: "80%",
    margin: "auto",
    color: "black",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    margin: "0",
  };

  const tableStyle = {
    margin: "auto",
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
    border: "2px solid #000", // Add border to the table
  };

  const thStyle = {
    margin: "auto",
    paddingBottom: "10px",
    fontSize: "25px",
    textAlign: "center",
    width: "33%",
    border: "1px solid #000", // Add borders to table headers
  };

  const tdStyle = {
    fontSize: "20px",
    textAlign: "center",
    width: "33%",
    border: "1px solid #000", // Add borders to table cells
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "48%" }}>
          <h2 style={{ fontSize: "30px" }}>Truck Data</h2>
          {/* Truck Data table */}
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
        <div style={{ width: "48%" }}>
          <h2 style={{ fontSize: "30px" }}>Load Data</h2>
          {/* Load Data table */}
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

      {/* <h2 style={{ fontSize: "30px" }}>Distances</h2>
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
      </table> */}

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

      
      
    </main>
  );
}
