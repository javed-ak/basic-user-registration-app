"use client"
import axios from "axios";
import Link from "next/link";
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false);

    const isFormInvalid = !firstName || !lastName || !email;

    const notify = () => toast.success("Congratulations! You are Registered Successfully");
    const handleSubmit = async () => {
        if (isFormInvalid) return;
        try {
            setLoading(true);
            axios.post('http://localhost:3000/api/user', {
                firstName,
                lastName,
                email
            });
            notify();
            setLoading(false);
            setIsRegistered(true)
        } catch (err) {
            console.error("Error submitting form:", err);
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="border border-gray-200 rounded-lg shadow-xl p-5 w-xl">
            <ToastContainer />
            {isRegistered ? (
                <div className="flex flex-col gap-5 justify-center items-center py-10 text-center px-5">
                    <div className="font-bold text-2xl">Congratulations!</div>
                    <div>You are registered successfully and now you can see yourself on <Link href={'/'} className="text-sky-600 underline" onClick={() => setIsRegistered(false)}>home page</Link></div>
                    <button className="cursor-pointer" onClick={() => setIsRegistered(false)}>Register another user?</button>
                </div>
            ) : (
                <div>
                    <div className="text-2xl font-bold font-mono text-center">Register Yourself</div>
                    <div className="flex flex-col gap-3 my-3">
                        <input onChange={e => setFirstName(e.target.value)} className="border border-gray-200 p-2 rounded" type="text" placeholder="First Name" />
                        <input onChange={e => setLastName(e.target.value)} className="border border-gray-200 p-2 rounded" type="text" placeholder="Last Name" />
                        <input onChange={e => setEmail(e.target.value)} className="border border-gray-200 p-2 rounded" type="email" placeholder="Email" />
                        <div className="text-center">
                            <button
                                onClick={handleSubmit}
                                className={`bg-black text-white rounded py-2 px-5 ${(isFormInvalid || loading) && 'bg-gray-600 cursor-not-allowed '}`}
                            >{loading ? (
                                <button className="flex justify-center items-center cursor-wait">
                                    <svg className="mr-2 size-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25" />
                                        <path d="M4 12a8 8 0 018-8" strokeWidth="4" strokeLinecap="round" className="opacity-75" />
                                    </svg>
                                    Processing...</button>
                            ) : 'Register'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
