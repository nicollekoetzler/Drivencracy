import { Router } from "express";
import { createPollChoice } from "../controllers/pollChoiceController.js"

const pollChoiceRouter = Router();
pollChoiceRouter.post("/choice", createPollChoice)

export default pollChoiceRouter