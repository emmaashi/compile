"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error handling
  const [successMessage, setSuccessMessage] = useState(""); // For success message

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission

    // Clear previous error and success messages
    setError("");
    setSuccessMessage("");

    // Prepare data for the POST request
    const formData = {
      email,
      password,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);  // Show success message
        // Redirect to the home page upon successful login
        window.location.href = "/home";  // Adjust the URL to match your routes
      } else {
        setError(data.message);  // Show error message
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-6">
      <main className="flex flex-col gap-8 w-full max-w-3xl items-center">
        <div className="w-128 h-128">
          <Image 
            src="/compile.png"
            alt="Compile Logo"
            width={480}
            height={480}
            priority
          />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          <div>
            <label htmlFor="email" className="block text-lg font-medium mb-2 text-black">
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border-b-2 border-gray-300 focus:border-black focus:outline-none py-3"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium mb-2 text-black">
              Password
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border-b-2 border-gray-300 focus:border-black focus:outline-none py-3"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <Button type="submit" className="w-full bg-black text-white py-3">
            Login
          </Button>
        </form>
        <p className="text-center text-lg text-black">
          Don’t have an account?{" "}
          <Link href="/sign-up" className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </main>
    </div>
  );
}
