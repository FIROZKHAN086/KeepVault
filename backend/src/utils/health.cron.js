import cron from "node-cron";
import axios from "axios";

const URL = process.env.URL || "http://localhost:5000/api/health";


cron.schedule("*/10 * * * * *", async () => {
  try {
    const res = await axios.get(URL);
    console.log("CRON HIT ", res.data.status);
  } catch (error) {
    console.log("CRON ERROR ", error.message);
  }
});