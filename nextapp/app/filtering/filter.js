import * as db from "./databaseController.js";
// const db = require("./databaseController");
const mqtt = require("mqtt");

const TRUCKS = "./data/trucks.json";
const LOADS = "./data/loads.json";
const NOTIFS = "./data/notifications.json";
const SUGGES = "./data/suggestions.json";
const PRICE_WEIGHT = 0.8;
const TL_WEIGHT = 1 - PRICE_WEIGHT;
const FUEL_COST_US = 0.31;

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
    db.clearDatabase(NOTIFS);
    db.clearDatabase(SUGGES);

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
    updateNotifications(dataArraytruck, dataArrayload, true, truckObject);
  } else if (truckObject.type === "Load") {
    isLoad(truckObject);
    updateNotifications(dataArraytruck, dataArrayload, false, truckObject);
  } else if (truckObject.type === "End" || truckObject.type === "Start") {
    isEnd();
  }

  // Read the existing JSON file
};
const updateNotifications = (truckarr, loadarr, isTruck, truckObject) => {
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
      db.deleteItem(NOTIFS, notifItem);
    } else if (notifItem.state === "rejected") {
      db.deleteItem(NOTIFS, notifItem);
    }
  });
  const suggestionsArr = db.getAllItems(SUGGES);
  suggestionsArr.forEach((item) => {
    if (item.state === "accepted") {
      // Remove matching items from truckarr
      truckarr = truckarr.filter(
        (truckItem) => truckItem.truckId !== item.truckId
      );
      db.writeData(TRUCKS, truckarr);
      // Remove matching items from loadarr
      loadarr = loadarr.filter((loadItem) => loadItem.loadId !== item.loadId);
      db.writeData(LOADS, loadarr);
      db.deleteItem(SUGGES, item);
    } else if (item.state === "rejected") {
      db.deleteItem(SUGGES, item);
    }
  });
  decideNotifications(truckarr, loadarr, isTruck, truckObject);
};
const decideNotifications = async (truckarr, loadarr, isTruck, truckObject) => {
  if (isTruck) {
    const truck = truckObject;
    let goodLoads = [];
    let isNotifCategory = true;

    // Use Promise.all to wait for all asynchronous operations to complete
    await Promise.all(
      loadarr.map(async (load) => {
        if (truck.equipType !== load.equipmentType) {
          return;
        }

        const LOD_distance = await getGoogleDistance(
          load.originLatitude,
          load.originLongitude,
          load.destinationLatitude,
          load.destinationLongitude
        );

        if (
          mapDistanceToLengthPreference(LOD_distance) ===
          truck.nextTripLengthPreference.toString()
        ) {
          isNotifCategory = true;
        } else {
          isNotifCategory = false;
        }

        const TL_distance = await getGoogleDistance(
          truck.positionLatitude,
          truck.positionLongitude,
          load.originLatitude,
          load.originLongitude
        );

        const importance = calculateImportance(
          LOD_distance,
          TL_distance,
          load.mileage,
          load.price
        );

        if (importance >= 60) {
          goodLoads.push({ load: load, importance: importance });
          isNotifCategory
            ? sendNotifs(truck, goodLoads)
            : sendSuggestions(truck, goodLoads);
        }
      })
    );
  } else {
    await Promise.all(
      truckarr.map(async (truck) => {
        let goodLoads = [];
        let isNotifCategory = true;

        // Use Promise.all to wait for all asynchronous operations to complete
        await Promise.all(
          loadarr.map(async (load) => {
            if (truck.equipType !== load.equipmentType) {
              return;
            }

            const LOD_distance = await getGoogleDistance(
              load.originLatitude,
              load.originLongitude,
              load.destinationLatitude,
              load.destinationLongitude
            );

            if (
              mapDistanceToLengthPreference(LOD_distance) ===
              truck.nextTripLengthPreference.toString()
            ) {
              isNotifCategory = true;
            } else {
              isNotifCategory = false;
            }

            const TL_distance = await getGoogleDistance(
              truck.positionLatitude,
              truck.positionLongitude,
              load.originLatitude,
              load.originLongitude
            );

            const importance = calculateImportance(
              LOD_distance,
              TL_distance,
              load.mileage,
              load.price
            );

            if (importance >= 70) {
              goodLoads.push({ load: load, importance: importance });
              isNotifCategory
                ? sendNotifs(truck, goodLoads)
                : sendSuggestions(truck, goodLoads);
            }
          })
        );
      })
    );
  }
};

const calculateImportance = (TL_distance, mileage, price) => {
  const priceImportance = profitToImportance(mileage, price) * PRICE_WEIGHT;
  const mapTLimportance = scaleFuncTL(TL_distance) * TL_WEIGHT;

  return mapTLimportance + priceImportance;
};
const profitToImportance = (mileage, price) => {
  const cost = mileage * FUEL_COST_US;
  const profit = price - cost;
  // console.log(profit);
  const minProfit = 0;
  const maxProfit = 1800;

  // Ensure profit is within the range [minProfit, maxProfit]
  const boundedProfit = Math.max(minProfit, Math.min(maxProfit, profit));

  // If profit is less than minProfit, use minProfit; if greater than maxProfit, use maxProfit
  const clampedProfit = Math.max(minProfit, Math.min(maxProfit, boundedProfit));

  // Linear scaling
  const scaledImportance =
    ((clampedProfit - minProfit) / (maxProfit - minProfit)) * 100;

  return Math.round(scaledImportance); // Round to the nearest integer
};

const scaleFuncTL = (TL_distance) => {
  const maxTLDistance = 300;
  const maxImportance = 100;

  // Ensure TL_distance is within the range [0, maxTLDistance]
  const boundedTLDistance = Math.max(0, Math.min(maxTLDistance, TL_distance));

  // Linear scaling
  const scaledImportance = (boundedTLDistance / maxTLDistance) * maxImportance;

  // Apply the special case for TL_distance > 300
  const finalImportance = TL_distance > 300 ? 0 : Math.round(scaledImportance);

  return finalImportance;
};
const sendNotifs = (truck, goodLoads) => {
  // Find the load with the highest importance
  const highestImportanceLoad = findHighestImportanceLoad(goodLoads);

  // Perform actions based on the highest importance load
  if (highestImportanceLoad == null) {
    return;
  } else if (
    db.doesItemExist(NOTIFS, highestImportanceLoad?.loadId) &&
    db.doesItemExist(NOTIFS, truck?.truckId)
  ) {
    return;
  } else {
    const mileage = highestImportanceLoad.mileage;
    const profit = highestImportanceLoad.price - mileage * FUEL_COST_US;
    const notif = {
      loadId: highestImportanceLoad.loadId,
      truckId: truck.truckId,
      profit: profit,
      mileage: mileage,
      status: "pending",
    };
    // Notify or perform any other actions with the highest importance load and truck details
    db.addItem(NOTIFS, notif);
    console.log("added item notifs");
  }
};

const sendSuggestions = (truck, goodLoads) => {
  // Find the load with the highest importance
  const highestImportanceLoad = findHighestImportanceLoad(goodLoads);

  // Perform actions based on the highest importance load
  if (highestImportanceLoad == null) {
    return;
  } else if (
    db.doesItemExist(SUGGES, highestImportanceLoad?.loadId) &&
    db.doesItemExist(SUGGES, truck?.truckId)
  ) {
    //do nothing
  } else {
    const mileage = highestImportanceLoad.mileage;
    const profit = highestImportanceLoad.price - mileage * FUEL_COST_US;
    const notif = {
      loadId: highestImportanceLoad.loadId,
      truckId: truck.truckId,
      profit: profit,
      mileage: mileage,
      status: "pending",
    };
    // Notify or perform any other actions with the highest importance load and truck details
    db.addItem(SUGGES, notif);
    console.log("added item suggestions");
  }
};
// Helper function to find the load with the highest importance
const findHighestImportanceLoad = (goodLoads) => {
  let highestImportanceLoad = null;
  let highestImportance = -1;

  goodLoads.forEach((item) => {
    if (item.importance > highestImportance) {
      highestImportance = item.importance;
      highestImportanceLoad = item.load;
    }
  });

  return highestImportanceLoad;
};
// function calculateDistance(lat1, lon1, lat2, lon2) {
//   const R = 6371; // Radius of the Earth in kilometers
//   const milesConversion = 0.621371; // Conversion factor from kilometers to miles

//   const dLat = (lat2 - lat1) * (Math.PI / 180);
//   const dLon = (lon2 - lon1) * (Math.PI / 180);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(lat1 * (Math.PI / 180)) *
//       Math.cos(lat2 * (Math.PI / 180)) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const distanceInKm = R * c; // Distance in kilometers
//   const distanceInMiles = distanceInKm * milesConversion; // Convert to miles
//   return distanceInMiles;
// }
const mapDistanceToLengthPreference = (distance) => {
  const threshold = 200;
  return distance > threshold ? "Long" : "Short";
};
const getGoogleDistance = async (lat1, lng1, lat2, lng2) => {
  const origin = lat1 + "," + lng1;
  const destination = lat2 + "," + lng2;
  const apiKey = "AIzaSyAKxCpR8daQzrrMy8a9Z4MKhrdZV2CsaUI";
  const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&mode=driving&key=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const distanceValueInMeters = data.rows[0].elements[0].distance.value;
    const distanceValueInMiles = distanceValueInMeters * 0.000621371; // Conversion factor

    return distanceValueInMiles.toFixed(5);
  } catch (error) {
    console.error("Error fetching distance data:", error);
  }
};

// const connectionMap = new Map();

// const addNewConnection = (load, truck) => {
//   if (!connectionExists(load, truck)) {
//     // Add new connection
//     const importance = computeImportance(load, truck);
//     const connectionKey = getKey(load, truck);
//     connectionMap.set(connectionKey, { load, truck, importance });

//     console.log(
//       `New connection added: ${connectionKey}, Importance: ${importance}`
//     );
//   } else {
//     console.log(`Connection already exists for ${getKey(load, truck)}`);
//   }
// };

// const connectionExists = (load, truck) => {
//   return connectionMap.has(getKey(load, truck));
// };

// const computeImportance = (load, truck) => {
//   // Replace this with your logic to compute importance
//   // For simplicity, I'm using a random value between 0 and 1
//   return Math.random();
// };

// const getKey = (load, truck) => {
//   return `${load.id}-${truck.id}`;
// };

// // Example usage
// const load1 = { id: 1, weight: 500 };
// const truck101 = { id: 101, capacity: 1000 };

// addNewConnection(load1, truck101);
// addNewConnection(load1, truck101); // This should log that the connection already exists
