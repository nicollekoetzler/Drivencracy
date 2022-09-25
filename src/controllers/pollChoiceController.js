import joi from "joi";
import db from "../databases/mongo.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

export async function createPollChoice(req, res){

    const choiceData = req.body
    const choiceDataSchema = joi.object(
        {
            title: joi.string().required(),
		    pollId: joi.string().required().length(24)
        }
    );

    try{

        const isBodyValid = choiceDataSchema.validate(choiceData);
        
        if ( isBodyValid.error ){
            return res.sendStatus(422);
        }

        const isPollExistent = await db.collection("poll").findOne({ _id: ObjectId(choiceData.pollId)});

        if(!isPollExistent){
            return res.status(404).send("Uma opção de voto não pode ser inserida sem uma enquete existente.");
        }

        const isTitleExistent = await db.collection("choice").findOne({ title: choiceData.title });

        if(isTitleExistent){
            return res.status(409).send("Já existe uma opção com esse título.");
        }

        const date = dayjs()

        const dateDifference = date.diff( isPollExistent.expireAt, "day")

        if (dateDifference > 0){
            return res.status(403).send("enquete expirada.")
        }

        await db.collection("choice").insertOne(choiceData);

        res.sendStatus(201)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }

}

export async function getChoice(req, res){

    try{

        const id = req.params.id;

        const isPollExistent = await db.collection("poll").findOne({ _id: ObjectId(id)});

        if(!isPollExistent){
            return res.status(404).send("Enquete não encontrada.");
        }
        
        const choices = await db.collection("choice").find({ pollId: id }).toArray()

        res.status(200).send(choices);

    } catch (err){
        console.log(err)
        res.sendStatus(500)
    }
}