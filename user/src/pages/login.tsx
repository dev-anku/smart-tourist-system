import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });
      localStorage.setItem("token", res.data.token);
      navigate('/home');
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-black border flex flex-col  border-white/20 gap-2 rounded-xl shadow-sm p-5"
      >
        <h2 className="text-white/80 font-semibold text-2xl">Login</h2>

        <input
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
          className="w-100 text-white/80 py-2 px-2 outline-none bg-neutral-900 mt-3 rounded-md"
          type="email"
          placeholder="Enter email"
        />

        <input
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
          className="w-100 text-white/80 py-2 px-2 outline-none bg-neutral-900 rounded-md"
          type="password"
          placeholder="Enter Password"
        />

        <p className="text-sm ml-auto text-white/50 cursor-pointer hover:text-white/80" onClick={() => navigate("/register")}>New user? Register</p>

        <button
          type="submit"
          className="bg-white rounded-lg px-3 py-2 text-sm font-semibold mt-2 cursor-pointer"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
