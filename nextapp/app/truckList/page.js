import React from 'react';
import { Tdata, Ldata, distances } from './getList.js';

export default function OtherPage() {
  return (
    <main>
      <div>
        {/* Truck Table */}
        <h2>Truck Data</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            {Tdata.map((data, index) => (
              <tr key={`T${index}`}>
                <td>{data.id}</td>
                <td>{data.latitude}</td>
                <td>{data.longitude}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Load Table */}
        <h2>Load Data</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            {Ldata.map((data, index) => (
              <tr key={`L${index}`}>
                <td>{data.id}</td>
                <td>{data.latitude}</td>
                <td>{data.longitude}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Render Distances */}
        <h2>Distances</h2>
        <table>
          <thead>
            <tr>
              <th>Truck ID</th>
              <th>Load ID</th>
              <th>Distance (km)</th>
            </tr>
          </thead>
          <tbody>
            {distances.map((pair, index) => (
              <tr key={`D${index}`}>
                <td>{pair.truck.id}</td>
                <td>{pair.load.id}</td>
                <td>{pair.distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}