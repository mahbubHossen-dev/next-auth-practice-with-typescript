'use client';
// import { signIn } from "next-auth/react";
// import registerUser from '@/app/action/registerUser';
import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import SocialLogin from "./SocialLogin";
import { FormEvent } from "react";
import registerUser from "@/app/actions/auth/registerUser";

// ✅ ইউজার রেজিস্ট্রেশনের ডাটা টাইপের জন্য ইন্টারফেস
interface RegisterData {
    name: string;
    email: string;
    password: string;
}

const RegisterForm: React.FC = () => {
    // const router = useRouter();

    // ✅ handleRegister ফাংশনে টাইপ নির্ধারণ করা হয়েছে
    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const form = e.currentTarget; // ✅ এখন TypeScript জানবে এটি একটি ফর্ম এলিমেন্ট
        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        const userData: RegisterData = { name, email, password };
        console.log(userData)
        toast('Creating ...');
        
        const result = await registerUser(userData);
        console.log(result)
        // if (result.insertedId) {
        //     const loginResult = await signIn('credentials', { email, password, redirect: false });
        //     if (loginResult?.ok) {
        //         toast.success('Register Success!');
        //         router.push('/');
        //     }
        // }

        // console.log(result);
    };

    return (
        <div>
            <form onSubmit={handleRegister} className="form-control">
                <label className="fieldset-label">Name</label>
                <input type="text" name='name' className="input" placeholder="Name" required />
                
                <label className="fieldset-label">Email</label>
                <input type="email" name='email' className="input" placeholder="Email" required />
                
                <label className="fieldset-label">Password</label>
                <input type="password" name='password' className="input" placeholder="Password" required />
                
                <div><a className="link link-hover">Forgot password?</a></div>
                
                <button type="submit" className="btn btn-neutral mt-4">Register</button>
            </form>

            <div>
                {/* <SocialLogin /> */}
            </div>
        </div>
    );
};

export default RegisterForm;
