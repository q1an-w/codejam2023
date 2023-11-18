import React from 'react';
import { Tdata, Ldata, distances, ascendingDistances} from './getList.js';

export default function OtherPage() {
  const yellowPalette = {
    color: 'black',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    margin: '0',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  };

  const thStyle = {
    paddingBottom: '10px',
    fontSize: '22px',
    textAlign: 'left',
    width: '33%', // Equal width for each column (3 columns = 33.33% each)
    // You can adjust the percentage value based on the number of columns
  };

  const tdStyle = {
    textAlign: 'left',
    width: '33%', // Equal width for each column (3 columns = 33.33% each)
    // You can adjust the percentage value based on the number of columns
  };

  return (
    <main style={yellowPalette}>
      <div>
        <h2 style={{ fontSize: '30px' }}>Truck Data</h2>
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

        <h2 style={{ fontSize: '30px' }}>Load Data</h2>
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

        <h2 style={{ fontSize: '30px' }}>Distances</h2>
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

        <h2 style={{ fontSize: '30px' }}>Ascending Distances</h2>
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

        {/* <h2 style={{ fontSize: '30px' }}>Max Distance FIlter Ascending Distances</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Truck ID</th>
              <th style={thStyle}>Load ID</th>
              <th style={thStyle}>Distance (miles)</th>
            </tr>
          </thead>
          <tbody>
            {maxDistanceFilter.map((pair, index) => (
              <tr key={`D${index}`}>
                <td style={tdStyle}>{pair.truck.id}</td>
                <td style={tdStyle}>{pair.load.id}</td>
                <td style={tdStyle}>{pair.distance}</td>
              </tr>
            ))}
          </tbody>
        </table> */}

      </div>
    </main>
  );
}
