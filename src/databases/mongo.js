import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGODB_URL);
let db;

try {
    await mongoClient.connect();
    db = mongoClient.db(process.env.DATABASE);
    
} catch (error) {
    console.log(error);
}

export default db