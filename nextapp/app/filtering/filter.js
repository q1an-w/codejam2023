import * as db from "../filtering/databasecontroller";

const mqtt = require("mqtt");
const fs = require("fs");

const TRUCKS = "./data/trucks.json";
const LOADS = "./data/loads.json";
const NOTIFS = "./data/notifications.json";
const SUGGES = "./data/suggestions.json";

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
    // db.clearDatabase("./data/notifications.json");
    // db.clearDatabase("./data/suggestions.json");
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

const decideNotifications = (truckarr, loadarr) => {};

const sendNotifs = () => {};
