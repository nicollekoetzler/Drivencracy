import { Router } from "express";
import { createPollChoice } from "../controllers/pollChoiceController.js"
import { getChoice } from "../controllers/pollChoiceController.js"

const pollChoiceRouter = Router();
pollChoiceRouter.post("/choice", createPollChoice)
pollChoiceRouter.get("/poll/:id/choice", getChoice)

export default pollChoiceRouter