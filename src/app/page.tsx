import Link from "next/link";
import Image from "next/image"; // Import Image component
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
          <Link href="/home">
            <Button className="w-full bg-black text-white py-3">
              Login
            </Button>
          </Link>
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