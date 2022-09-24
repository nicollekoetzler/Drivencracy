import joi from "joi";
import dayjs from "dayjs";
import db from "../databases/mongo.js";

export async function createPoll(req, res){

    const pollData = req.body
    const pollDataSchema = joi.object(
        {
            title: joi.string().required(),
            expireAt: joi.string()
        }
    );
    
    try {

        const isBodyValid = pollDataSchema.validate(pollData);
        
        if ( isBodyValid.error ){
            return res.sendStatus(422);
        }

        const isExpireAtValid = dayjs(pollData.expireAt).isValid()

        let date = dayjs().add(30, "day").format("YYYY-MM-DD HH:mm")
        
        if ( isExpireAtValid ){
            date = dayjs(pollData.expireAt).add(30, "day").format("YYYY-MM-DD HH:mm")
        }

        await db.collection("poll").insertOne(
            { 
                title: pollData.title,
                expireAt: date
            }
        );

        res.sendStatus(201)
    } catch (err){
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getPoll(req, res){

    try{

        const pollData = await db.collection("poll").find().toArray()

        res.status(200).send(pollData);

    } catch (err){
        console.log(err)
        res.sendStatus(500)
    }
}