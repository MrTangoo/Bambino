"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", { email, password, redirect: false });

    if (res?.error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-6 bg-gray-100">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-900 p-6 rounded-lg shadow-lg text-white"
      >
        <motion.h2 className="text-4xl font-semibold text-center mb-4">
          Se connecter
        </motion.h2>
        
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 transition-all"
            required
          />
          
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 transition-all"
            required
          />
          
          <div className="flex justify-end mb-4">
            <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-white">
              Mot de passe oublié ?
            </motion.a>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-br from-green-400 to-blue-600 p-3 rounded-lg font-bold hover:opacity-80 disabled:opacity-50"
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}