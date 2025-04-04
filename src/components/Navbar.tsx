'use client'
// import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { signOut, useSession } from "next-auth/react"
const Navbar: React.FC = () => {
    const { data: session, status } = useSession()
    console.log(session, status)
    // const uri: string | undefined = process.env.MONGODB_URI;
    // console.log(uri)
    // const status: string | boolean = false;
    // const status = false
    const navLinks = (
        <>
            <li><Link href={'/'}>Home</Link></li>
            <li><Link href={'/about'}>About</Link></li>
            <li><Link href={'/services'}>Services</Link></li>
            <li><Link href={'/blog'}>Blog</Link></li>
            <li><Link href={'/contact'}>Contact</Link></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm w-11/12 mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>
                <Link href={'/'} className="btn btn-ghost text-xl">
                    <Image src={'/assets/logo.svg'} width={80} height={70} alt='Logo' />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    status === 'authenticated' ? (
                        <Link href={'/login'}>
                            <button onClick={() => signOut()} className='btn'>Logout</button>
                        </Link>
                    ) : (
                        <>
                            <Link href={'/register'}>
                                <button className='btn'>Register</button>
                            </Link>
                            <Link href={'/login'}>
                                <button className='btn'>Login</button>
                            </Link>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default Navbar;
