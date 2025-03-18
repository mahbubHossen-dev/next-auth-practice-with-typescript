
import React from 'react';
import LoginForm from './components/LoginForm';

const LoginPage: React.FC = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

