import pg from "pg";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// Create a new PostgreSQL client instance
const db = new pg.Client({
  user: process.env.PG_USER, // PostgreSQL username
  host: process.env.PG_HOST || "localhost", // Database host (default: localhost)
  database: process.env.PG_DATABASE, // Database name
  password: process.env.PG_PASSWORD, // PostgreSQL password
  port: parseInt(process.env.PG_PORT, 10), // Database port (ensure it's a number)
});

// Establish the connection
db.connect((err) => {
  if (err) {
    console.error("Connection error", err.stack);
  } else {
    console.log("Connected to the database");
  }
});

// Handle errors on the idle client
db.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

// Export the query function
export const query = (text, params) => db.query(text, params);
export default db;
