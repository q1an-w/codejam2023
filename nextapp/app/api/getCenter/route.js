import { NextResponse } from "next/server";
import * as db from "../../filtering/databaseController.js";

const TRUCKS = "./data/trucks.json";
// let userId;
export async function GET(req) {
  console.log(req);
  const userID = req.url.includes("?")
    ? req.url.split("?")[1].split("=")[1]
    : null;
  console.log(userID);
  const data = db.getItemById(TRUCKS, Number(userID));
  // ...
  return NextResponse.json(data);
}
// export async function POST(req) {
//   const { userID } = req.query;
//   userId = userID;
//   console.log(userId); // Assign userId with the value of userID
//   // Additional logic for the POST request...
// }
