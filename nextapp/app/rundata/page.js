"use client";
import React, { useState, useEffect } from "react";
import "./run.css";
const Palette = {
  width: "80%",
  margin: "auto",
  color: "black",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
};
const tableStyle = {
  margin: "auto",
  width: "95%",
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
const LOCALURL = "";

export default function otherpage() {
  // const client = connectToMQTTBroker();

  const [notifs, setNotifs] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [tdata, setTdata] = useState([]);
  const [ldata, setLdata] = useState([]);
  const getNotifs = async () => {
    try {
      const response = await fetch(LOCALURL + "/api/getNotifData");
      const result = await response.json();
      setNotifs(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getSuggestions = async () => {
    try {
      const response = await fetch(LOCALURL + "/api/getSuggestions");
      const result = await response.json();
      setSuggestions(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getTrucks = async () => {
    try {
      const response = await fetch(LOCALURL + "/api/getTrucks");
      const result = await response.json();
      setTdata(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getLoads = async () => {
    try {
      const response = await fetch(LOCALURL + "/api/getLoads");
      const result = await response.json();
      setLdata(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getAll = async () => {
    await getNotifs();
    await getSuggestions();
    await getTrucks();
    await getLoads();
  };
  // Import necessary modules

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await getAll();
    }, 3000);

    // Cleanup interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div
        style={{
          display: "block",
          justifyContent: "center",
        }}
      >
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
        </div>
        <div style={{ float: "left", width: "50%" }}>
          <div style={{ marginBottom: "30px", overflowX: "auto" }}>
            <h2
              style={{
                fontSize: "30px",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              Notifications
            </h2>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Load ID</th>
                  <th style={thStyle}>Truck ID</th>
                  <th style={thStyle}>Profit</th>
                  <th style={thStyle}>Mileage</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {notifs.map((data, index) => (
                  <tr key={`T${index}`}>
                    <td style={tdStyle}>{data.loadId}</td>
                    <td style={tdStyle}>{data.truckId}</td>
                    <td style={tdStyle}>{data.profit}</td>
                    <td style={tdStyle}>{data.mileage}</td>
                    <td style={tdStyle}>{data.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ float: "left", width: "50%" }}>
          <div style={{ marginBottom: "30px", overflowX: "auto" }}>
            <h2
              style={{
                fontSize: "30px",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              Suggestions
            </h2>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Load ID</th>
                  <th style={thStyle}>Truck ID</th>
                  <th style={thStyle}>Profit</th>
                  <th style={thStyle}>Mileage</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {suggestions.map((data, index) => (
                  <tr key={`T${index}`}>
                    <td style={tdStyle}>{data.loadId}</td>
                    <td style={tdStyle}>{data.truckId}</td>
                    <td style={tdStyle}>{data.profit}</td>
                    <td style={tdStyle}>{data.mileage}</td>
                    <td style={tdStyle}>{data.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* <div style={{ display: "block" }}> */}
        <div style={{ float: "left", width: "50%" }}>
          <div style={{ marginBottom: "30px", overflowX: "auto" }}>
            <h2
              style={{
                fontSize: "30px",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              Truck Data
            </h2>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Location</th>
                  <th style={thStyle}>Equipment Type</th>
                  <th style={thStyle}>Preference</th>
                </tr>
              </thead>
              <tbody>
                {tdata.map((data, index) => (
                  <tr key={`T${index}`}>
                    <td style={tdStyle}>{data.truckId}</td>
                    <td style={tdStyle}>
                      {data.positionLatitude.toFixed(3) +
                        " / " +
                        data.positionLongitude.toFixed(3)}
                    </td>
                    <td style={tdStyle}>{data.equipType}</td>
                    <td style={tdStyle}>{data.nextTripLengthPreference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ float: "left", width: "50%", marginLeft: "0px" }}>
          <div style={{ marginBottom: "30px", overflowX: "auto" }}>
            <h2
              style={{
                fontSize: "30px",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              Load Data
            </h2>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Origin</th>
                  <th style={thStyle}>Destination</th>
                  <th style={thStyle}>Equipment Type</th>
                </tr>
              </thead>
              <tbody>
                {ldata.map((data, index) => (
                  <tr key={`T${index}`}>
                    <td style={tdStyle}>{data.loadId}</td>
                    <td style={tdStyle}>
                      {data.originLatitude.toFixed(3) +
                        "  / " +
                        data.originLongitude.toFixed(3)}
                    </td>
                    <td style={tdStyle}>
                      {data.destinationLatitude.toFixed(3) +
                        "  / " +
                        data.destinationLongitude.toFixed(3)}
                    </td>
                    <td style={tdStyle}>{data.equipmentType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}
