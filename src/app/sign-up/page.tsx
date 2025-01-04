import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
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
        <form className="flex flex-col gap-6 w-full">
          <div>
            <label htmlFor="email" className="block text-lg font-medium mb-2 text-black">
              Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full border-b-2 border-gray-300 focus:border-black focus:outline-none py-3"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium mb-2 text-black">
              First Name
            </label>
            <Input
              type="name"
              id="firstName"
              placeholder="Enter your first name"
              className="w-full border-b-2 border-gray-300 focus:border-black focus:outline-none py-3"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium mb-2 text-black">
              Last Name
            </label>
            <Input
              type="name"
              id="lastName"
              placeholder="Enter your last name"
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
              placeholder="Enter your password"
              className="w-full border-b-2 border-gray-300 focus:border-black focus:outline-none py-3"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium mb-2 text-black">
              Confirm Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full border-b-2 border-gray-300 focus:border-black focus:outline-none py-3"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-black text-white py-3">
            Sign-Up
          </Button>
        </form>
      </main>
    </div>
  );
}


