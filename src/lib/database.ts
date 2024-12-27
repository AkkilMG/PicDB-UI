import { MongoClient, Db, Collection } from 'mongodb';
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'sangrahdb';

let db: Db;
let user, file: Collection;

async function connectToDatabase() {
    const client = new MongoClient(url);
    await client.connect();
    db = client.db(dbName);
    user = db.collection('user');
    file = db.collection('file');
    console.log('Connected to database');
}


export async function saveUrl(id: string, filename: string, contentType: any) {
    var data = {
        id,
        filename,
        contentType
    };
    const result = await file.insertOne(data);
    console.log(`Data inserted with id: ${result.insertedId}`);
}


export async function getFileData(id: any) {
    const data = await file.findOne({ id: id });
    return data;
}