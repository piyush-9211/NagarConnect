import { useState } from "react";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("piyush@gmail.com");
  const [password, setPassword] = useState("123456");

  const login = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("token", res.data.token);

window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      alert("Login Failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={login}>Login</button>
    </div>
  );
}