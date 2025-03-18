'use server';
import bcrypt from 'bcrypt';
import dbConnect, { collectionNamesObj } from '@/DB/dbConnect';
import { Collection, ObjectId } from 'mongodb';

// ✅ ১. `payload` এর সঠিক টাইপ নির্ধারণ করা হলো
interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}
// ✅ UserDocument ইন্টারফেস (MongoDB থেকে পাওয়া ইউজারের তথ্য)
export interface UserDocument {
    _id: ObjectId; // MongoDB-এর ObjectId
    name: string;
    email: string;
    password: string;
    createdAt?: Date; // অপশনাল ফিল্ড (যদি থাকে)
}
const registerUser = async (payload: RegisterPayload) => {
    console.log(payload);

    // ✅ ৪. `dbConnect('users')` থেকে আসা collection টাইপ নির্ধারণ করা হলো
    const userCollection: Collection<UserDocument> = dbConnect(collectionNamesObj.userCollection);

    const email = payload.email;

    // ✅ ৫. `findOne` থেকে পাওয়া রেজাল্টের টাইপ নির্দিষ্ট করা হলো
    const user: UserDocument | null = await userCollection.findOne({ email });


    console.log(user)

    if (!user) {
        try {
            const passwordHashTag = await bcrypt.hash(payload.password, 10);
            payload.password = passwordHashTag;
            const result = await userCollection.insertOne(payload as RegisterPayload);
            return {
                acknowledged: result.acknowledged,
                insertedId: result.insertedId.toString(), // ObjectId -> String
            };
        } catch (error) {
            console.error("Registration Failed:", error);
            return null
        }

    }
    return 'Already Have an Account';
};

export default registerUser;
