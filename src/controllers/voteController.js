import db from "../databases/mongo.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

export async function createVote(req, res){

    try {

        const id = req.params.id;

        const isChoiceExistent = await db.collection("choice").findOne({ _id: ObjectId(id)});

        if(!isChoiceExistent){
            return res.status(404).send("Opção não encontrada.");
        }

        const poll = await db.collection("poll").findOne({ _id: ObjectId(isChoiceExistent.pollId)});

        const date = dayjs()

        const dateDifference = date.diff( poll.expireAt, "day")
        console.log(dateDifference)

        if (dateDifference > 0){
            return res.status(403).send("Enquete expirada.")
        }

        await db.collection("vote").insertOne(
            {
                createdAt: dayjs().format("YYYY-MM-DD HH:mm"),
                choiceId: ObjectId(id),
            }
        );

        res.sendStatus(201)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}