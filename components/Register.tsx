"use client"

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    const isFormInvalid = !firstName || !lastName || !email;

    const notifySuccess = () => toast.success("🎉 Congratulations! You are registered successfully");
    const notifyError = (msg: string) => toast.error(msg);

    const handleSubmit = async () => {
        if (isFormInvalid) return;

        try {
            setLoading(true);

            const res = await axios.post('http://localhost:3000/api/user', {
                firstName,
                lastName,
                email
            });

            notifySuccess();
            setIsRegistered(true);

        } catch (err: any) {
            if (err.response && err.response.status === 400) {
                notifyError(err.response.data.message || "⚠️ Email is already registered");
            } else {
                notifyError("❌ Something went wrong. Please try again");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            <div className="border border-gray-200 rounded-lg shadow-xl p-5 w-xl m-auto mt-10">
            <ToastContainer position="top-right" />

            {isRegistered ? (
                <div className="flex flex-col gap-5 justify-center items-center py-10 text-center px-5">
                    <div className="font-bold text-2xl">🎉 Congratulations!</div>
                    <div>
                        You are registered successfully and now you can see yourself on{' '}
                        <Link href={'/'} className="text-sky-600 underline" onClick={() => setIsRegistered(false)}>
                            home page
                        </Link>.
                    </div>
                    <button
                        className="bg-gray-800 text-white rounded px-4 py-2"
                        onClick={() => setIsRegistered(false)}
                    >
                        Register another user?
                    </button>
                </div>
            ) : (
                <div className="">
                    <div className="text-2xl font-bold font-mono text-center mb-5">
                        Register Yourself
                    </div>

                    <div className="flex flex-col gap-3 my-3">
                        <input
                            onChange={e => setFirstName(e.target.value)}
                            className="border border-gray-200 p-2 rounded"
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            required
                        />

                        <input
                            onChange={e => setLastName(e.target.value)}
                            className="border border-gray-200 p-2 rounded"
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            required
                        />

                        <input
                            onChange={e => setEmail(e.target.value)}
                            className="border border-gray-200 p-2 rounded"
                            type="email"
                            placeholder="Email"
                            value={email}
                            required
                        />

                        <div className="text-center">
                            <button
                                onClick={handleSubmit}
                                disabled={isFormInvalid || loading}
                                className={`bg-black text-white rounded py-2 px-5 ${isFormInvalid || loading ? 'bg-gray-600 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <div className="flex justify-center items-center cursor-wait">
                                        <svg className="mr-2 w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25" />
                                            <path d="M4 12a8 8 0 018-8" strokeWidth="4" strokeLinecap="round" className="opacity-75" />
                                        </svg>
                                        Processing...
                                    </div>
                                ) : (
                                    'Register'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
}
