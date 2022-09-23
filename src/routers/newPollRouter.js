import { Router } from "express";
import { createPoll } from "../controllers/newPollController.js"
import { getPoll } from "../controllers/newPollController.js"

const newPollRouter = Router();
newPollRouter.post("/poll", createPoll)
newPollRouter.get("/poll", getPoll)

export default newPollRouter