'use server';
import bcrypt from 'bcrypt';
import dbConnect, { collectionNamesObj } from '@/DB/dbConnect';

// ✅ ইউজারের লগইন ডাটা টাইপ নির্ধারণ
interface LoginPayload {
    email: string;
    password: string;
}

// ✅ লগইনের রেসপন্স টাইপ নির্ধারণ (যদি ইউজার মিলে তাহলে `UserDocument`, না মিললে `null`)
interface UserDocument {
    _id: string;
    name: string;
    email: string;
    password: string;
}

const loginUser = async (payload: LoginPayload): Promise<UserDocument | null> => {
    const { email, password } = payload;
    const userCollection = dbConnect(collectionNamesObj.userCollection);
    
    // ✅ টাইপ নির্দিষ্ট করা হয়েছে (user হতে পারে `UserDocument` অথবা `null`)
    const user = await userCollection.findOne<UserDocument>({ email });

    if (!user) return null;

    // ✅ bcrypt এর মাধ্যমে পাসওয়ার্ড মিলিয়ে দেখা হচ্ছে
    const isPasswordOk = await bcrypt.compare(password, user.password);
    if (!isPasswordOk) return null;

    return user;
};

export default loginUser;
