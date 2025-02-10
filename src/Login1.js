// src/Login.js
import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
      toast.success("Login berhasil!"); // Notifikasi sukses
      navigate("/dashboard"); // Arahkan ke dashboard setelah login
    } catch (err) {
      setError(err.message);
      toast.error("Login gagal: " + err.message); // Notifikasi gagal
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      <p>
        Belum punya akun?{" "}
        <button onClick={() => navigate("/register")}>Daftar di sini</button>
      </p>
    </div>
  );
};

export default Login;
