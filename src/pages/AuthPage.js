import React, { useState } from "react";
import { motion } from "framer-motion";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

const AuthPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("UA");

  const countryCodes = {
    UA: { name: "UA", code: "+380" },
    US: { name: "USA", code: "+1" },
    PL: { name: "PL", code: "+48" },
    DE: { name: "DE", code: "+49" }
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
    setPhone(countryCodes[selectedCountry].code);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name, phoneNumber: phone });
        setUser(userCredential.user);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.div 
      className="flex items-center justify-center min-h-screen bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-96"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          {isLogin ? "Вхід" : "Реєстрація"}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <motion.input
              type="text"
              placeholder="Ім'я"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
          )}

          <div className="flex space-x-2">
            {!isLogin && (
              <motion.select
                value={country}
                onChange={handleCountryChange}
                className="w-1/3 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {Object.entries(countryCodes).map(([key, { name, code }]) => (
                  <option key={key} value={key}>
                    {name} ({code})
                  </option>
                ))}
              </motion.select>
            )}
            {!isLogin && (
              <motion.input
                type="text"
                placeholder="Номер телефону"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-2/3 p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              />
            )}
          </div>

          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
          <motion.input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          />
          <motion.button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
          >
            {isLogin ? "Увійти" : "Зареєструватися"}
          </motion.button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 w-full text-sm text-gray-400 hover:text-white transition p-3"
        >
          {isLogin ? "Немає акаунта? Зареєструватися" : "Вже є акаунт? Увійти"}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default AuthPage;
