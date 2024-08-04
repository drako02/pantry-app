'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Container } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import Link from "next/link";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center items-center w-[100%] h-[100%]">
            <div className=" bg-white flex  flex-col justify-between items-center gap-[10px] w-[250px] p-[3%] rounded-[5px] ">
                <TextField
                    label="Email"
                    type="email"
                    // autoComplete="on"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    // autoComplete="on"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" onClick={handleLogin}>Login</Button>

                <div><Link href='/sign-up'> Sign up?</Link></div>
            </div>
        </div>
)

};

export default Login;