"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { UserType } from "@/types/models";

const RegistrationPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!formData.username || !formData.password) {
            setError("All fields are required!");
            return false;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long!");
            return false;
        }
        return true;
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setError("");
            console.log("Form submitted", formData);
        }
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: formData.username
            }),
        });
        try {
            const newUserData: UserType = await response.json();
            console.log('newuser:', newUserData);
            router.push("/profile" );
            localStorage.setItem('userId', newUserData._id.toString())
        } catch (error) {
            console.error('register:', error); 
        }
    };

    // CSS for dirt block texture pattern
    const dirtPattern = `
    repeating-linear-gradient(45deg, 
      #8B4513 0px, #8B4513 2px,
      #654321 2px, #654321 4px
    ),
    repeating-linear-gradient(-45deg,
      #8B4513 0px, #8B4513 2px,
      #654321 2px, #654321 4px
    )
  `;

    return (
        <div className="min-h-screen bg-[#87CEEB] flex items-center justify-center p-4 font-minecraft">
            {/* Main dirt block container */}
            <Card className="w-full max-w-md bg-[#8B4513] border-8 border-[#654321] shadow-2xl relative overflow-hidden">
                {/* Top darker edge */}
                <div className="absolute top-0 left-0 w-full h-4 bg-[#543210] opacity-30" />
                {/* Right darker edge */}
                <div className="absolute top-0 right-0 h-full w-4 bg-[#543210] opacity-30" />

                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-4xl flex flex-col gap-4">
                        {/* <img
              src="/api/placeholder/400/100"
              alt="Minecraft"
              className="mx-auto mb-6 w-64"
            /> */}
                        <img
                            src="https://i.imgur.com/SuaiIKE.png"
                            alt="Minecraft Logo"
                            className="minecraft-logo"
                        />
                        <p className="my-4 vt">Register Page</p>
                    </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <Alert className="bg-red-200 border-red-500 text-red-800">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-[#C8B398] border-2 border-[#654321] focus:border-[#8B4513] outline-none text-lg placeholder-[#4A3728]"
                            />
                        </div>

                        <div className="space-y-2">
                            <Input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-[#C8B398] border-2 border-[#654321] focus:border-[#8B4513] outline-none text-lg placeholder-[#4A3728]"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-[#5C4033] hover:bg-[#6B4423] text-white font-bold py-3 px-6 border-b-4 border-[#43302B] hover:border-[#382820] active:border-b-0 active:mt-1 transition-all duration-100"
                        >
                            Register
                        </Button>
                    </form>
                </CardContent>

                {/* Pixelated texture overlay */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: dirtPattern,
                        backgroundSize: "8px 8px",
                    }}
                />
            </Card>
        </div>
    );
};

export default RegistrationPage;

// "use client"

// import React, { useState } from 'react';
// import "./MinecraftStyle.css";
// import { useRouter } from 'next/navigation'

// const RegistrationPage: React.FC = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({

//   username: '',
//     //email: '',
//     password: '',
//   });

//   const [error, setError] = useState('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const validateForm = () => {
//     if (!formData.username || !formData.password) {
//       setError('All fields are required!');
//       return false;
//     }
//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters long!');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setError('');
//       //assume API is called:

//       console.log('Form submitted', formData);
//     }
//   };

//   return (
//     <div className="registration-container">
//       <h1></h1>
//       <img src="https://i.imgur.com/SuaiIKE.png" alt="Minecraft Logo" className="minecraft-logo" />
//       {error && <div className="error">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="username"></label>
//           <input
//             type="text"
//             name="username"
//             className="form-control"
//             placeholder='username'
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password"></label>
//           <input
//             type="password"
//             name="password"
//             className="form-control"
//             placeholder='password'
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">register</button>
//       </form>
//     </div>
//   );
// };

// export default RegistrationPage;
