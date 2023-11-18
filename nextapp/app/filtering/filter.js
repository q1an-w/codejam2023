import * as db from "./databaseController.js";
// const db = require("./databaseController");
const mqtt = require("mqtt");

const TRUCKS = "./data/trucks.json";
const LOADS = "./data/loads.json";
const NOTIFS = "./data/notifications.json";
const SUGGES = "./data/suggestions.json";
const LOD_WEIGHT = 0.5;
const TL_WEIGHT = 1 - LOD_WEIGHT;

// Function to connect to MQTT broker
export const connectToMQTTBroker = () => {
  // MQTT broker details
  const brokerOptions = {
    host: "fortuitous-welder.cloudmqtt.com",
    port: 1883,
    username: "CodeJamUser",
    password: "123CodeJam",
    clean: true, // cleanSession: true
    clientId: "washningmashing01",
  };

  // MQTT client
  const client = mqtt.connect(brokerOptions);

  // Handle connection event
  client.on("connect", () => {
    console.log("Connected to MQTT broker");
    db.clearDatabase(LOADS);
    db.clearDatabase(TRUCKS);
    db.clearDatabase("./data/notifications.json");
    db.clearDatabase("./data/suggestions.json");

    // Subscribe to the desired topic
    client.subscribe("CodeJam", { qos: 1 }, (err, granted) => {
      if (err) {
        console.error("Error subscribing to topic:", err);
      } else {
        console.log("Subscribed to topic:");
      }
    });
  });

  // Handle message event
  client.on("message", (topic, message) => {
    dataPreProcess(topic, message);
  });

  // Handle error event
  client.on("error", (err) => {
    console.error("Error:", err);
  });

  // Handle close event
  client.on("close", () => {
    console.log("Connection to MQTT broker closed");
  });

  // Return the MQTT client
  return client;
};

// // Example usage
// const mqttClient = connectToMQTTBroker();

// // To send a message
// mqttClient.publish("CodeJam", "Hello, CodeJam!", { qos: 1 });

const dataPreProcess = (topic, message) => {
  let truckObject = JSON.parse(message.toString("utf8"));
  const dataArraytruck = db.getAllItems(TRUCKS);
  const dataArrayload = db.getAllItems(LOADS);
  const isTruck = (truckObject) => {
    dataArraytruck.push(truckObject);
    db.writeData(TRUCKS, dataArraytruck);
  };
  const isLoad = (truckObject) => {
    dataArrayload.push(truckObject);
    db.writeData(LOADS, dataArrayload);
  };
  const isEnd = () => {
    db.clearDatabase(LOADS);
    db.clearDatabase(TRUCKS);
    db.clearDatabase("./data/notifications.json");
    db.clearDatabase("./data/suggestions.json");
  };

  if (truckObject.type === "Truck") {
    isTruck(truckObject);
    updateNotifications(dataArraytruck, dataArrayload);
  } else if (truckObject.type === "Load") {
    isLoad(truckObject);
    updateNotifications(dataArraytruck, dataArrayload);
  } else if (truckObject.type === "End") {
    isEnd();
  }

  // Read the existing JSON file
};
const updateNotifications = (truckarr, loadarr) => {
  const notifArray = db.getAllItems(NOTIFS);
  notifArray.forEach((notifItem) => {
    if (notifItem.state === "accepted") {
      // Remove matching items from truckarr
      truckarr = truckarr.filter(
        (truckItem) => truckItem.truckId !== notifItem.truckId
      );
      db.writeData(TRUCKS, truckarr);

      // Remove matching items from loadarr
      loadarr = loadarr.filter(
        (loadItem) => loadItem.loadId !== notifItem.loadId
      );
      db.writeData(LOADS, loadarr);
    }
  });
  decideNotifications(truckarr, loadarr);
};

const decideNotifications = (truckarr, loadarr) => {
  truckarr.forEach((truck) => {
    loadarr.forEach((load) => {
      if (truck.equipType !== load.equipmentType) {
      } else {
        const isNotifCategory = true;
        const LOD_distance = calculateDistance(
          load.originLatitude,
          load.originLongitude,
          load.destinationLatitude,
          load.destinationLongitude
        );
        if (
          mapDistanceToLengthPreference(LOD_distance) !==
          truck.nextTripLengthPreference
        ) {
          isNotifCategory = false;
        }
        const TL_distance = calculateDistance(
          truck.positionLatitude,
          truck.positionLongitude,
          load.originLatitude,
          load.originLongitude
        );
        const importance = calculateImportance(LOD_distance, TL_distance);
        isNotifCategory ? sendNotifs(importance) : sendSuggestions(importance);
      }
    });
  });
};
const calculateImportance = (LOD_distance, TL_distance) => {
  const mapLODimportance = scaleFuncLOD(LOD_distance);
  const mapTLimportance = scaleFuncTL(LOD_distance, TL_distance);
  return mapLODimportance + mapTLimportance;
};
const scaleFuncLOD = (LOD_distance) => {};
const scaleFuncTL = (LOD_distance, TL_distance) => {};
const sendNotifs = (importance) => {};
const sendSuggestions = (importance) => {};

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
const mapDistanceToLengthPreference = (distance) => {
  const threshold = 141.42;
  return distance >= threshold ? "long" : "short";
};
