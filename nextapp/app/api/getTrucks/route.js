import { NextResponse } from "next/server";
import * as db from "../../filtering/databaseController.js";

const TRUCKS = "./data/trucks.json";
const LOADS = "./data/loads.json";
const NOTIFS = "./data/notifications.json";
const SUGGES = "./data/suggestions.json";

export async function GET(req) {
  const data = db.getAllItems(TRUCKS);
  // ...
  return NextResponse.json(data);
}
// module.exports = function (req, res) {
//   if (req.method === "GET") {
//     const data = db.getAllItems(LOADS);
//     res.status(200).json(data);
//   } else {
//     // Handle other HTTP methods
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// };
