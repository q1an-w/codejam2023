const { readFileSync } = require('fs');
const dataTrucks = readFileSync('./app/truckList/trucks.json', 'utf8');
const dataLoads = readFileSync('./app/truckList/loads.json', 'utf8');
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
const Tdata = parsedDataT.map(truck => ({
  id: truck.truckId,
  latitude: truck.positionLatitude,
  longitude: truck.positionLongitude,
  maxDistance: truck.max
}));

// Extracting longitude, latitude, and ID for loads
const Ldata = parsedDataL.map(load => ({
  id: load.loadId,
  latitude: load.originLatitude,
  longitude: load.originLongitude
}));

// Function to sort loads by distance for each truck
function sortLoadsByDistance(distances) {
  const loadsByTruck = {};

  distances.forEach(({ truck, load, distance }) => {
    const truckId = truck.id;

    if (!loadsByTruck[truckId]) {
      loadsByTruck[truckId] = [];
    }

    loadsByTruck[truckId].push({ load, distance });
  });

  // Sort loads by distance for each truck
  for (const truckId in loadsByTruck) {
    loadsByTruck[truckId].sort((a, b) => a.distance - b.distance);
  }

  return loadsByTruck;
}

// Calculating distances between loads and trucks
const distances = [];
Tdata.forEach(truck => {
  Ldata.forEach(load => {
    const distance = calculateDistance(
      truck.latitude,
      truck.longitude,
      load.latitude,
      load.longitude
    );

    // Check if the distance exceeds the truck's maximum distance
    if (distance <= truck.maxDistance) {
      distances.push({
        truck: truck,
        load: load,
        distance: distance.toFixed(1)
      });
    }
  });
});

// Sorting loads by distance for each truck
const loadsByDistance = sortLoadsByDistance(distances);

module.exports = { Tdata, Ldata, distances, loadsByDistance };
