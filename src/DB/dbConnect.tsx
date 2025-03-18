import { MongoClient, ServerApiVersion } from 'mongodb';

const uri: string | undefined = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
}

interface CollectionNames {
    servicesCollection: string;
    userCollection: string;
}

export const collectionNamesObj: CollectionNames = {
    servicesCollection: 'services',
    userCollection: 'users'
};

export default function dbConnect(collectionName: keyof CollectionNames) {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    
    return client.db(process.env.CAR_DOCTOR_DB).collection(collectionName);
}