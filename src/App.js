import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Popular from "./pages/popular";
import SearchPage from "./pages/search";
import MovieDetails from "./pages/details";
import Saved from "./pages/saved";
import AuthPage from "./pages/AuthPage"; 

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

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <Routes>
                {!user ? (
                    <>
                        <Route path="/auth" element={<AuthPage setUser={setUser} />} />
                        <Route path="*" element={<Navigate to="/auth" replace />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Popular />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/movie/:id" element={<MovieDetails />} />
                        <Route path="/saved" element={<Saved />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </>
                )}
            </Routes>

            {user && (
                <button onClick={handleLogout} className="logout-btn">
                    Вийти
                </button>
            )}
        </>
    );
}

export default App;
