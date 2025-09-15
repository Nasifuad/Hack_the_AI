import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import Voter_router from "./src/route/voter_route.js";
import Candidate_router from "./src/route/candidate_route.js";
import Vote_router from "./src/route/voter_route.js";
import ballot_Router from "./src/route/ballot_route.js";
import Homo_router from "./src/route/homomophic_route.js";
import connectDB from "./server.js";
import Dp_router from "./src/route/analytics_route.js";
const app = express();
app.use(cors());
app.use(express.json());

connectDB() &&
  app.listen(process.env.PORT, () =>
    console.log(` Server is running on port ${process.env.PORT}`)
  );

app.use("/api", Voter_router);
app.use("/api", Candidate_router);
app.use("/api", Vote_router);
app.use("/api", ballot_Router);
app.use("/api", Homo_router);
app.use("/api", Dp_router);
