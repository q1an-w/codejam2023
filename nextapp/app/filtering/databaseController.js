const fs = require("fs");

const initializeDatabase = (filePath) => {
  // Check if the file exists, if not, create an empty array
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }

  return filePath;
};

// Read data from the file
const readData = (filePath) => {
  const jsonData = fs.readFileSync(filePath, "utf8");
  return JSON.parse(jsonData);
};

// Write data to the file
const writeData = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Get all items
const getAllItems = (filePath) => {
  return readData(filePath);
};

// Get an item by ID
const getItemById = (filePath, itemId) => {
  const data = readData(filePath);
  return data.find((item) => item.loadId === itemId || item.truckId === itemId);
};

// Add a new item
const addItem = (filePath, newItem) => {
  const data = readData(filePath);
  newItem.seq = generateSeq();
  data.push(newItem);
  writeData(filePath, data);
  return newItem;
};

// Update an item by ID
const updateItem = (filePath, itemId, updatedItem) => {
  const data = readData(filePath);
  const index = data.findIndex(
    (item) => item.loadId === itemId || item.truckId === itemId
  );

  if (index !== -1) {
    data[index] = { ...data[index], ...updatedItem };
    writeData(filePath, data);
    return data[index];
  }

  return null;
};

// Delete an item by ID
const deleteItem = (filePath, itemId) => {
  const data = readData(filePath);
  const filteredData = data.filter(
    (item) => item.loadId !== itemId && item.truckId !== itemId
  );

  if (filteredData.length < data.length) {
    writeData(filePath, filteredData);
    return true;
  }

  return false;
};

// Generate a unique sequence number
const generateSeq = () => {
  return Date.now();
};
const clearDatabase = (filePath) => {
  const emptyArray = [];
  writeData(filePath, emptyArray);
};

module.exports = {
  initializeDatabase,
  getAllItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
  clearDatabase,
};
