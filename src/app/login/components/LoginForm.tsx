'use client'
import React, { FormEvent } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
// import SocialLogin from './SocialLogin';

const LoginForm: React.FC = () => {
    const router = useRouter();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;
        
        toast('Submitting ...');
        console.log({email, password})
        try {
            const result = await signIn('credentials', { email, password, redirect: false });
            if (result?.ok) {
                router.push('/');
                toast.success('Login Success');
            } else {
                toast.error('Invalid email or password.');
            }
        } catch (error) {
            toast.error('Login Failed');
            
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin} className="form-control">
                <label className="fieldset-label">Email</label>
                <input type="email" name='email' className="input" placeholder="Email" required />
                <label className="fieldset-label">Password</label>
                <input type="password" name='password' className="input" placeholder="Password" required />
                <div><a className="link link-hover">Forgot password?</a></div>
                <button type='submit' className="btn btn-neutral mt-4">Login</button>
            </form>
            
        </div>
    );
};

export default LoginForm;
