import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";

function Register() {
  const [from, setFrom] = useState({ email: "", password: "", username: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/register", from);
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setError(error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex bg-[#010104] justify-center items-center min-h-screen px-4 text-[#eae9fc]">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-[#3a31d8]">
        <h1 className="text-3xl font-extrabold mb-2 ">Create account</h1>
        <p className="text-2xl font-semibold pb-2">
          Start taking collaborative notes today
        </p>

        {error && <div>{error}</div>}
        {success && <div>{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm">Email</label>
            <input
              type="email"
              placeholder="you@gmail.com"
              value={from.email}
              onChange={(e) => setFrom({ ...from, email: e.target.value })}
              className="w-full bg-[#2a1fe1] text-[#eae9fc] rounded-lg px-4 py-3 outline-none border border-[#2a1fe1] focus:border-[#170cda] transition"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Username</label>
            <input
              type="text"
              placeholder="user1234"
              value={from.username}
              onChange={(e) => setFrom({ ...from, username: e.target.value })}
              className="w-full bg-[#2a1fe1] text-[#eae9fc] rounded-lg px-4 py-3 outline-none border border-[#2a1fe1] focus:border-[#170cda] transition"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={from.password}
              onChange={(e) => setFrom({ ...from, password: e.target.value })}
              className="w-full bg-[#2a1fe1] text-[#eae9fc] rounded-lg px-4 py-3 outline-none border border-[#2a1fe1] focus:border-[#170cda] transition"
              required
            />
          </div>
          <div className="flex justify-center">
          <button type="submit" disabled={loading} className=" py-2 px-8 mb-3 font-semibold bg-[#2a1fe1] rounded-lg hover:bg-[#170cda] ">
            {loading ? "Creating account..." : "Create Account"}
          </button></div>
        </form>

        <p className="text-center">
          Already have an account? <Link to={"/login"}>Login</Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default Register;
