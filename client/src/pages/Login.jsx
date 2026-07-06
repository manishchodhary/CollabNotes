import { useAuth } from "../context/authcontext.jsx";
import api from "../api/axios.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [from, setFrom] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", from);
      login(data);
      navigate("/dashboard");
    } catch (error) {
      setError(error || "Login failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-[#010104] justify-center items-center min-h-screen px-4 text-[#eae9fc]">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-[#3a31d8]">
          <h1 className="text-3xl font-bold mb-2">Welcome back </h1>
        <p className="text-1xl mb-8">Login to your CollabNotes account</p>
        {error && <div>{error}</div>}
   
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm">Email</label>
            <input
              type="email"
              placeholder="you@email.com"
              value={from.email}
              onChange={(e) => setFrom({ ...from, email: e.target.value })}
              className="w-full bg-[#2a1fe1] text-[#eae9fc] rounded-lg px-4 py-3 outline-none border border-[#2a1fe1] focus:border-[#2318e5] transition"
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
              className="w-full bg-[#2a1fe1] text-[#eae9fc] rounded-lg px-4 py-3 outline-none border border-[#2a1fe1] focus:border-[#2318e5] transition"
              required
            />
          </div>
          <div className="flex justify-center">
          <button type="submit" disabled={loading} className=" py-2 px-8 mb-2 font-semibold bg-[#2a1fe1] rounded-lg hover:bg-[#170cda] ">
            {loading ? "Login..." : "Login"}
          </button></div>
        </form>
        <p className="text-center">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
