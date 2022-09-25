import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import newPollRouter from "../src/routers/newPollRouter.js"
import pollChoiceRouter from "../src/routers/pollChoiceRouter.js"
import voteRouter from "../src/routers/voteRouter.js"
import resultRouter from "../src/routers/resultRouter.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(newPollRouter);
app.use(pollChoiceRouter);
app.use(voteRouter);
app.use(resultRouter);


app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});