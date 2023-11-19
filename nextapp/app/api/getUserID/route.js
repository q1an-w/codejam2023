export default async function handler(req, res) {
  const { userID } = req.query;

  // Do something with the userID on the server side
  // For example, you can store it in a database or use it to fetch relevant data

  res.status(200).json({ message: "UserID set successfully" });
}
