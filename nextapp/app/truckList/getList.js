const { readFileSync } = require("fs");
const dataTrucks = readFileSync("./app/truckList/trucks.json", "utf8");
const dataLoads = readFileSync("./app/truckList/loads.json", "utf8");
const parsedDataT = JSON.parse(dataTrucks);
const parsedDataL = JSON.parse(dataLoads);

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

// Extracting longitude and latitude for trucks
const Tdata = parsedDataT.map((truck) => ({
  max: truck.max,
  id: truck.truckId,
  latitude: truck.positionLatitude,
  longitude: truck.positionLongitude,
}));

// Extracting longitude, latitude, and ID for loads
const Ldata = parsedDataL.map((load) => ({
  id: load.loadId,
  latitude: load.originLatitude,
  longitude: load.originLongitude,
}));

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

    if (distance <= truck.max) { // Check if distance is within truck's max range
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


module.exports = { Tdata, Ldata, distances, ascendingDistances, maxDistanceFilter };  