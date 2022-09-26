import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let mongoClient
let db;

try {
    mongoClient = new MongoClient(process.env.MONGODB_URL);
    
    await mongoClient.connect()
    db = mongoClient.db(process.env.DATABASE)
}catch{
    console.log("problem to connect to the database")
}

export default db