import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Popular from "./pages/popular";
import SearchPage from "./pages/search";
import MovieDetails from "./pages/details";
import Saved from "./pages/saved";
import AuthPage from "./pages/AuthPage"; // Сторінка авторизації
import "./index.css";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <h2>Завантаження...</h2>;

    return (
        <Router>
            <Routes>
                {!user ? (
                    <Route path="*" element={<AuthPage setUser={setUser} />} />
                ) : (
                    <>
                        <Route path="/" element={<Popular />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/movie/:id" element={<MovieDetails />} />
                        <Route path="/saved" element={<Saved />} />
                        <Route path="/logout" element={<Logout />} />
                    </>
                )}
            </Routes>
            {user && <button onClick={() => signOut(auth)}>Вийти</button>}
        </Router>
    );
}

// Компонент для виходу
const Logout = () => {
    useEffect(() => {
        signOut(auth);
    }, []);
    return <Navigate to="/auth" />;
};

export default App;
