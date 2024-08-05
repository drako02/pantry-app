'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Container } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import Link from "next/link";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex justify-center items-center w-[100%] h-[100%]">
            <div
                className=" bg-white flex  flex-col justify-between items-center gap-[10px] w-[250px] p-[3%] rounded-[5px] ">
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" onClick={handleSignUp}>Sign Up</Button>
                {/*<div><Link href='/login'> Login?</Link></div>*/}
            </div>
        </div>
    )

};

export default SignUp;