// import RegisterForm from '@/components/RegisterForm'
import React from 'react'
import RegisterForm from './components/RegisterForm'

export default function register() {

    return (
        <div className='w-11/12 mx-auto'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}
