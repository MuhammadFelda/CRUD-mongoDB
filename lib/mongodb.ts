import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    let globalAny: any = global;
    if (!globalAny._mongoClientPromise) {
        globalAny._mongoClientPromise = client.connect();
    }
    clientPromise = globalAny._mongoClientPromise;
} else {
    clientPromise = client.connect();
}

export default clientPromise;
