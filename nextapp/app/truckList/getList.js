const { readFileSync } = require('fs');
const dataTrucks = readFileSync('./app/truckList/trucks.json', 'utf8');
const dataLoads = readFileSync('./app/truckList/loads.json', 'utf8');
const parsedDataT = JSON.parse(dataTrucks);
const parsedDataL = JSON.parse(dataLoads);

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }  

// Extracting longitude and latitude for trucks
const Tdata = parsedDataT.map(truck => ({
    id: truck.truckId,
    latitude: truck.positionLatitude,
    longitude: truck.positionLongitude
  }));
  
  // Extracting longitude, latitude, and ID for loads
  const Ldata = parsedDataL.map(load => ({
    id: load.loadId,
    latitude: load.originLatitude,
    longitude: load.originLongitude
  }));
  
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
      distances.push({
        truck: truck,
        load: load,
        distance: distance.toFixed(2) // Rounding distance to 2 decimal places
      });
    });
  });
  
  module.exports = { Tdata, Ldata, distances };