import mqtt from "mqtt";

export default function otherpage() {
  // Import necessary modules
  const mqtt = require("mqtt");

  // Function to connect to MQTT broker
  const connectToMQTTBroker = () => {
    // MQTT broker details
    const brokerOptions = {
      host: "fortuitous-welder.cloudmqtt.com",
      port: 1883,
      username: "CodeJamUser",
      password: "123CodeJam",
      clean: true, // cleanSession: true
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
          console.log("Subscribed to topic:", granted[0].topic);
        }
      });
    });

    // Handle message event
    client.on("message", (topic, message) => {
      console.log(`Received message on topic ${topic}: ${message.toString()}`);
      // Handle your message processing here
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

  // Example usage
  const mqttClient = connectToMQTTBroker();

  // To send a message
  mqttClient.publish("CodeJam", "Hello, CodeJam!", { qos: 1 });

  return <main>new page</main>;
}
