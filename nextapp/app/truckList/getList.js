const { readFileSync } = require("fs");
import { send } from "process";
import * as db from "../filtering/databaseController.js";

const TRUCKS = "./data/trucks.json";
const LOADS = "./data/loads.json";
const NOTIFS = "./data/notifications.json";
const SUGGES = "./data/suggestions.json";
const dataTrucks = readFileSync("./data/trucks.json", "utf8");
const dataLoads = readFileSync("./data/loads.json", "utf8");
const parsedDataN = db.getAllItems(NOTIFS);
const parsedDataT = JSON.parse(dataTrucks);
const parsedDataL = JSON.parse(dataLoads);

// const fetchID = async () => {
//   try {
//     const response = await fetch("/api/getLoads");
//     const result = await response.json();
//     setLoad(result);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const milesConversion = 0.621371; // Conversion factor from kilometers to miles

  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceInKm = R * c; // Distance in kilometers
  const distanceInMiles = distanceInKm * milesConversion; // Convert to miles
  return distanceInMiles;
}
let Ndata = parsedDataN.map((notif) => ({
  loadId: notif.loadId,
  truckId: notif.truckId,
  profit: notif.profit,
  mileage: notif.mileage,
  status: notif.status,
  seq: notif.seq,
}));

// Extracting longitude and latitude for trucks
const Tdata = parsedDataT.map((truck) => ({
  max: truck.max,
  id: truck.truckId,
  latitude: truck.positionLatitude,
  longitude: truck.positionLongitude,
}));

Tdata.sort((a, b) => a.id - b.id);

// Extracting longitude, latitude, and ID for loads
const Ldata = parsedDataL.map((load) => ({
  id: load.loadId,
  latitude: load.originLatitude,
  longitude: load.originLongitude,
}));

Ldata.sort((a, b) => a.id - b.id);

// Calculating distances between loads and trucks
const distances = [];
Tdata.forEach((truck) => {
  Ldata.forEach((load) => {
    const distance = calculateDistance(
      truck.latitude,
      truck.longitude,
      load.latitude,
      load.longitude
    );
    distances.push({
      truck: truck,
      load: load,
      distance: distance.toFixed(1),
    });
  });
});

// Calculating distances between loads and trucks
const ascendingDistances = [];

// Calculate distances and store in ascendingDistances array
Tdata.forEach((truck) => {
  const truckLoads = Ldata.map((load) => ({
    truck: truck,
    load: load,
    distance: calculateDistance(
      truck.latitude,
      truck.longitude,
      load.latitude,
      load.longitude
    ).toFixed(1),
  }));

  ascendingDistances.push(...truckLoads);
});

// Sort ascendingDistances based on truck ID in ascending order
ascendingDistances.sort((a, b) => {
  if (a.truck.id !== b.truck.id) {
    return a.truck.id - b.truck.id;
  }
  return a.distance - b.distance;
});

const maxDistanceFilter = [];

// Calculate distances and consider max distance of trucks
Tdata.forEach((truck) => {
  const truckLoads = Ldata.map((load) => {
    const distance = calculateDistance(
      truck.latitude,
      truck.longitude,
      load.latitude,
      load.longitude
    );

    if (distance <= truck.max) {
      // Check if distance is within truck's max range
      return {
        truck: truck,
        load: load,
        distance: distance.toFixed(1),
      };
    }
    return null; // Return null if distance exceeds max range
  }).filter((item) => item !== null); // Filter out null entries

  maxDistanceFilter.push(...truckLoads);
});

// Sort ascendingDistances based on truck ID in ascending order
maxDistanceFilter.sort((a, b) => {
  if (a.truck.id !== b.truck.id) {
    return a.truck.id - b.truck.id;
  }
  return a.distance - b.distance;
});
const sendData = () => {
  return Ndata;
};
// const intervalIdNdata = setInterval(intervaltest, 1000);
setInterval(() => {
  const parsedDataN = db.getAllItems(NOTIFS);
  Ndata = parsedDataN.map((notif) => ({
    loadId: notif.loadId,
    truckId: notif.truckId,
    profit: notif.profit,
    mileage: notif.mileage,
    status: notif.status,
    seq: notif.seq,
  }));
  sendData();
}, 1000);

module.exports = {
  sendData,
  Ndata,
  Tdata,
  Ldata,
  distances,
  ascendingDistances,
  maxDistanceFilter,
};
