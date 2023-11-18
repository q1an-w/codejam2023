const mqtt = require("mqtt");
const fs = require("fs");

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

  if (truckObject.type === "Truck") {
    isTruck(truckObject);
  } else if (truckObject.type === "Load") {
    isLoad(truckObject);
  } else if (truckObject.type === "End") {
    isEnd();
  }
  
  // Read the existing JSON file
};
const updateNotifications = () => {};

const decideNotifications = () => {};

const sendNotifs = () => {};

const isTruck = (truckObject) => {
  const jsonData = fs.readFileSync("./data/trucks.json");
  const dataArray = JSON.parse(jsonData.toString("utf8"));
  dataArray.push(truckObject);
  fs.writeFileSync("./data/trucks.json", JSON.stringify(dataArray, null, 2));
};
const isLoad = (truckObject) => {
  const jsonData = fs.readFileSync("./data/loads.json");
  const dataArray = JSON.parse(jsonData.toString("utf8"));
  dataArray.push(truckObject);
  fs.writeFileSync("./data/loads.json", JSON.stringify(dataArray, null, 2));
};
const isEnd = () => {
  fs.writeFileSync("./data/loads.json", "[]");
  fs.writeFileSync("./data/trucks.json", "[]");
};
