import db from "../databases/mongo.js";
import { ObjectId } from "mongodb";

export async function getResult (req, res){

    try{

        const id = req.params.id;

        const isPollExistent = await db.collection("poll").findOne({ _id: ObjectId(id)});

        if(!isPollExistent){
            return res.status(404).send("Enquete não encontrada.");
        }

        const poll = await db.collection("poll").findOne({ _id: ObjectId(id) });

        const options = await db.collection("choice").find({ pollId: id }).toArray()

        const votesQuantity = []
        
        for(let i = 0; i < options.length ; i++){
            const votes = await db.collection("vote").find({ choiceId: options[i]._id }).toArray()
            votesQuantity.push(votes.length)
        }

        console.log(votesQuantity)

        let mostVotes = votesQuantity[0]
        let mostVotedOption = options[0]

        for(let i = 0; i < votesQuantity.length; i++){
            if(votesQuantity[i] > mostVotes){
                mostVotes = votesQuantity[i]
                mostVotedOption = options[i]
            }
        }

        res.status(200).send({
            title: poll.title,
            expireAt: poll.expireAt,
            result: {
                title: mostVotedOption.title,
                votes: mostVotes
            }
        });

    } catch (err){
        console.log(err)
        res.sendStatus(500)
    }
}