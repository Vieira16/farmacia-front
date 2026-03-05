"use client"

import { FaUser, FaEnvelope, FaLock, FaIdCard } from "react-icons/fa"

export default function Login() {
  return (
    <div className="flex h-screen">

      {/* LEFT SIDE */}

      <div className="w-1/2 flex flex-col items-center justify-center text-center">

        <h1 className="text-5xl font-bold mb-6">
          Welcome Back!
        </h1>

        <p className="text-lg mb-10 w-80">
          Enter your personal details to use all of site features
        </p>

        <button className="border border-white px-10 py-3 rounded-lg hover:bg-white hover:text-blue-900 transition">
          Sign in
        </button>

      </div>

      {/* RIGHT SIDE */}

      <div className="w-1/2 flex items-center justify-center">

        <div className="w-[420px]">

          <h2 className="text-3xl font-semibold mb-2">
            Create your account
          </h2>

          <p className="text-sm mb-6">
            use your email for registration:
          </p>

          {/* Username */}

          <div className="flex items-center border border-white rounded-lg px-4 py-3 mb-4">

            <FaUser className="mr-3" />

            <input
              className="bg-transparent outline-none w-full"
              placeholder="Username"
            />

          </div>

          {/* CPF */}

          <div className="flex items-center border border-white rounded-lg px-4 py-3 mb-4">

            <FaIdCard className="mr-3" />

            <input
              className="bg-transparent outline-none w-full"
              placeholder="CPF"
            />

          </div>

          {/* Email */}

          <div className="flex items-center border border-white rounded-lg px-4 py-3 mb-4">

            <FaEnvelope className="mr-3" />

            <input
              className="bg-transparent outline-none w-full"
              placeholder="Email"
            />

          </div>

          {/* Password */}

          <div className="flex items-center border border-white rounded-lg px-4 py-3 mb-4">

            <FaLock className="mr-3" />

            <input
              type="password"
              className="bg-transparent outline-none w-full"
              placeholder="Password"
            />

          </div>

          {/* checkbox */}

          <div className="flex items-center mb-6 text-sm">

            <input type="checkbox" className="mr-2" />

            I agree with terms and conditions

          </div>

          {/* Button */}

          <button className="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition">
            Create my account
          </button>

        </div>

      </div>

    </div>
  )
}