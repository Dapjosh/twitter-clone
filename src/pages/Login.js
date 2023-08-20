/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <div className="mx-auto mt-12 max-w-md">
            <header>
                <h2 className="text-[28px] font-medium mb-2">Sign in</h2>
                <p className="text-sm mb-5">
                    Don't have an account?{' '}
                    <Link
                        className="text-blue-500 hover:underline decoration-blue-500"
                        to="/register"
                    >
                        Sign up
                    </Link>
                </p>
            </header>
            <form className="grid gap-y-2">
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
                <div className="py-3 flex items-center justify-between">
                    <label htmlFor="checkbox" className="flex items-center gap-1 ml-[1px]">
                        <input type="checkbox" name="checkbox" id="checkbox" />
                        <p className="text-xs">Remember me</p>
                    </label>
                    <Link to className="text-xs text-blue-500 hover:underline decoration-blue-500">
                        Forgot password?
                    </Link>
                </div>

                <button
                    type="button"
                    className=" hover:bg-blue-600 py-2 bg-blue-500 text-white rounded-md"
                >
                    Sign in
                </button>
                <button
                    type="button"
                    className="py-2 flex items-center justify-center gap-2 border-[1px] text-gray-500 rounded-md hover:bg-blue-50"
                >
                    <FcGoogle fontSize={25} />
                    <span className="text-sm">Sign in with Google</span>
                </button>
            </form>
        </div>
    );
}
