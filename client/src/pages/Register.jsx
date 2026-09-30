import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Phone, Lock, Shield } from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const res = await api.post("/auth/register", {
        fullName,
        email,
        phone,
        password,
      });

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save logged in user
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success("Registration Successful!");

      setTimeout(() => {
        window.location.href = "/";
      }, 500);

    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Registration Failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex">

      {/* Left Side */}

      <div className="hidden lg:flex w-1/2 flex-col justify-center px-20 relative overflow-hidden">

        <div className="absolute -top-40 -right-32 w-96 h-96 rounded-full bg-blue-900/30"></div>
        <div className="absolute bottom-20 left-0 w-72 h-72 rounded-full bg-blue-800/20"></div>

        <h2 className="text-5xl font-extrabold leading-tight">
          Join.
          <br />
          Report.
          <br />
          Improve.
        </h2>

        <p className="mt-6 text-blue-400 font-semibold uppercase tracking-wider">
          Powered by NagarConnect AI
        </p>

        <p className="mt-6 text-gray-300 text-lg max-w-lg">
          Create your account and help make your city smarter by reporting civic
          issues with AI-powered detection.
        </p>

        <div className="mt-14 bg-[#111827] rounded-3xl p-10 border border-gray-800">
          <img
            src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=900"
            alt="City"
            className="rounded-2xl"
          />
        </div>

      </div>

      {/* Right Side */}

      <div className="flex-1 flex justify-center items-center px-6">

        <div className="bg-[#111827] border border-gray-800 rounded-3xl w-full max-w-md p-10">

          <h1 className="text-4xl font-bold mb-2">
            Create Account
          </h1>

          <p className="text-gray-400 mb-8">
            Join NagarConnect and start reporting issues
          </p>

          <label className="text-sm text-gray-300">
            Full Name
          </label>

          <div className="flex items-center border border-gray-700 rounded-xl px-4 mt-2 mb-5">

            <User size={18} className="text-gray-400" />

            <input
              className="bg-transparent outline-none w-full p-4"
              placeholder="Rahul Kumar"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

          </div>

          <label className="text-sm text-gray-300">
            Email Address
          </label>

          <div className="flex items-center border border-gray-700 rounded-xl px-4 mt-2 mb-5">

            <Mail size={18} className="text-gray-400" />

            <input
              className="bg-transparent outline-none w-full p-4"
              placeholder="rahul@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <label className="text-sm text-gray-300">
            Phone Number
          </label>

          <div className="flex items-center border border-gray-700 rounded-xl px-4 mt-2 mb-5">

            <Phone size={18} className="text-gray-400" />

            <input
              className="bg-transparent outline-none w-full p-4"
              placeholder="+91 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

          </div>

          <label className="text-sm text-gray-300">
            Password
          </label>

          <div className="flex items-center border border-gray-700 rounded-xl px-4 mt-2">

            <Lock size={18} className="text-gray-400" />

            <input
              type="password"
              className="bg-transparent outline-none w-full p-4"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          <button
            onClick={register}
            className="mt-8 w-full bg-blue-700 hover:bg-blue-600 transition rounded-xl py-4 text-lg font-semibold"
          >
            Create Account →
          </button>

          <div className="flex justify-center items-center gap-2 mt-8 text-gray-400">
            <Shield size={16} />
            Secure JWT Authentication
          </div>

          <p className="text-center mt-8 text-gray-400">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-500 hover:text-blue-400"
            >
              Sign In
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}