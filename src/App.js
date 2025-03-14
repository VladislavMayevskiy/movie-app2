import React from "react";
import { Routes, Route } from "react-router-dom";
import Popular from "./pages/popular";
import SearchPage from "./pages/search";
import MovieDetails from "./pages/details"; 
import Saved from "./pages/saved";
import "./index.css"
function App() {
    return (
        
        <Routes>
            <Route path="/" element={<Popular />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/movie/:id" element={<MovieDetails />} /> 
            <Route path="/saved" element={<Saved />} />
        </Routes>
        
    );
}

export default App;

