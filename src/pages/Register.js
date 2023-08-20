import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

export default function Register() {
    return (
        <div className="mx-auto mt-12 max-w-md">
            <header>
                <h2 className="text-[28px] font-medium mb-2">Sign up with your email</h2>
                <p className="text-sm mb-5">
                    Already have an account?{' '}
                    <Link className="text-blue-500 hover:underline decoration-blue-500" to="/login">
                        Sign in
                    </Link>
                </p>
            </header>
            <form className="grid gap-y-2">
                <label className="flex flex-col" htmlFor="name">
                    <span className="text-sm mb-1 font-semibold">Full Name</span>
                    <input
                        className="bg-gray-100 rounded-md outline-none px-3 py-2"
                        type="text"
                        id="name"
                        placeholder="Mohammah Ali"
                    />
                </label>
                <label className="flex flex-col" htmlFor="email">
                    <span className="text-sm mb-1 font-semibold">Email address</span>
                    <input
                        className="bg-gray-100 rounded-md outline-none px-3 py-2"
                        type="email"
                        id="email"
                        placeholder="mohammah@gmail.com"
                    />
                </label>
                <label className="flex flex-col" htmlFor="password">
                    <span className="text-sm mb-1 font-semibold">Password</span>
                    <input
                        className="bg-gray-100 rounded-md outline-none px-3 py-2"
                        type="password"
                        id="password"
                        placeholder="Password"
                    />
                </label>
                <label htmlFor="checkbox" className="flex items-center gap-1 py-4 ml-[1px]">
                    <input type="checkbox" name="checkbox" id="checkbox" />
                    <p className="text-xs">
                        I agree to the{' '}
                        <Link to className="text-blue-500 hover:underline decoration-blue-500">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to className="text-blue-500 hover:underline decoration-blue-500">
                            Privacy Policy
                        </Link>
                    </p>
                </label>
                <button
                    type="button"
                    className=" hover:bg-blue-600 py-2 bg-blue-500 text-white rounded-md"
                >
                    Sign up
                </button>
                <button
                    type="button"
                    className="py-2 flex items-center justify-center gap-2 border-[1px] text-gray-500 rounded-md hover:bg-blue-50"
                >
                    <FcGoogle fontSize={25} />
                    <span className="text-sm">Sign up with Google</span>
                </button>
            </form>
        </div>
    );
}
