import React, { useState } from "react"; 
import { motion } from "framer-motion";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import fon from '../styles/fon.png'

const AuthPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("UA");
  const [loading, setLoading] = useState(false);

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

  const handlePhoneChange = (e) => {
    const phoneInput = e.target.value;
    if (/^\d*$/.test(phoneInput)) {
      setPhone(phoneInput);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Невірний формат email");
      return;
    }

    if (!validatePassword(password)) {
      setError("Пароль повинен містити принаймні 6 символів");
      return;
    }

    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="flex items-center justify-center min-h-screen relative"
      style={{
        backgroundImage: `url(${fon})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div
        className="absolute inset-0 bg-black opacity-50"
        style={{
          filter: "blur(10px)",
        }}
      ></div>
  
      <motion.div 
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 relative z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
       
        <h1 className="text-3xl font-bold text-white text-center mb-4">
          Movie App Air Max 90
        </h1>
  
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
                onChange={handlePhoneChange}
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
            disabled={loading}
          >
            {loading ? "Завантаження..." : isLogin ? "Увійти" : "Зареєструватися"}
          </motion.button>
        </form>
  
        <motion.button
          onClick={handleGoogleSignIn}
          className="w-full p-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 mt-4"
          whileHover={{ scale: 1.05 }}
          disabled={loading}
        >
          {loading ? "Завантаження..." : "Увійти через Google"}
        </motion.button>
  
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
