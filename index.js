import express from "express";
import mainRouter from "./routes/main.js";
import dotenv from "dotenv";
import connectDb from "./ConnectDB/db.js";
import cors from "cors";
import axios from "axios";
const app = express();

app.use(express.json());
app.use(cors());

dotenv.config({
  path: ".env",
});

app.get("/", (req, res) => {
  res.json({
    message: " THe server is running Properly",
  });
});

app.use("/api/v1", mainRouter);


// Helper: Fetch stream and convert to string
async function fetchStreamAsString(url) {
  const response = await axios({
    method: "get",
    url,
    responseType: "stream",
  });

  const chunks = [];

  for await (const chunk of response.data) {
    chunks.push(chunk); // Buffer chunks
  }

  return Buffer.concat(chunks).toString(); // Convert buffer to string
}

// Parse string data into array of objects
function parseStreamDataToArray(dataStr) {
  dataStr = dataStr.trim();

  // Try to parse as JSON array directly
  try {
    const parsed = JSON.parse(dataStr);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (e) {
    // Ignore and try next method
  }

  // If not a JSON array, try to parse as newline-delimited JSON (NDJSON)
  const lines = dataStr.split("\n");
  const arr = [];

  for (const line of lines) {
    try {
      if (line.trim()) {
        arr.push(JSON.parse(line));
      }
    } catch (e) {
      // skip invalid lines
      console.warn("Skipping invalid JSON line:", line);
    }
  }

  return arr;
}

// API route
app.get("/news", async (req, res) => {
  const targetUrl =
    "https://sachet.ndma.gov.in/cap_public_website/FetchAllAlertDetails";

  if (!targetUrl) {
    return res.status(400).json({ error: "Missing targetUrl query parameter" });
  }

  try {
    const dataStr = await fetchStreamAsString(targetUrl);
    const dataArray = parseStreamDataToArray(dataStr);

    res.json({ data: dataArray });
  } catch (err) {
    console.error("Error fetching or parsing stream:", err);
    res.status(500).json({ error: "Failed to fetch or parse stream" });
  }
});


connectDb().then(()=>{
    try {
        app.listen(process.env.PORT || 8000 , ()=>{
            console.log(`The localhost is running at http://localhost:${process.env.PORT}`)
        })
    } catch (error) {
       console.log(error)
    }
})
// app.listen(2000, () => {
//   console.log("the server is running");
// });
