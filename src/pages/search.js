import React, { useState, useEffect } from "react";
import { Toolbar, Typography, Grid, Card, CardMedia, CardContent, Button, TextField, IconButton, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const API_KEY = "a9985d790ed03fe28c91a2295f212fde";
const API_URL_SEARCH = "https://api.themoviedb.org/3/search/movie";

function SearchPage() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [likedMovies, setLikedMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];
        setLikedMovies(savedMovies);
    }, []);

    const handleSearch = async () => {
        try {
            const response = await axios.get(API_URL_SEARCH, {
                params: {
                    api_key: API_KEY,
                    language: "uk-UA",
                    query: query,
                },
            });
            setMovies(response.data.results);
        } catch (error) {
            console.error("Помилка під час пошуку:", error);
        }
    };

    const handleLike = (movie) => {
        const isLiked = likedMovies.some((m) => m.id === movie.id);

        if (isLiked) {
            const updatedMovies = likedMovies.filter((m) => m.id !== movie.id);
            setLikedMovies(updatedMovies);
            localStorage.setItem("likedMovies", JSON.stringify(updatedMovies));
        } else {
            const updatedMovies = [...likedMovies, movie];
            setLikedMovies(updatedMovies);
            localStorage.setItem("likedMovies", JSON.stringify(updatedMovies));
        }
    };

    return (
        <div style={{ backgroundColor: "#121212", minHeight: "100vh", color: "#fff" }}>
            <Toolbar sx={{ backgroundImage: "linear-gradient(to right, rgb(0,0,0), rgb(255, 255, 255))", color: "#fff" }}>

                <Button variant="contained" color="primary" onClick={() => navigate("/")} sx={{ fontWeight: 'bold', backgroundColor: "#fff", color: "#000" }}>
                    Назад
                </Button>
                <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center", fontWeight: 'bold' }}>
                    Пошук фільмів
                </Typography>
            </Toolbar>

            <Box sx={{ display: "flex", gap: "20px", padding: "20px", justifyContent: "center" }}>
                <TextField
                    label="Введіть назву фільму"
                    variant="outlined"
                    fullWidth
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    sx={{ backgroundColor: "rgb(255,255,255)", borderRadius: "8px", color: "#000" }}
                />
                <Button variant="contained" color="primary" onClick={handleSearch} sx={{ height: "100%" ,backgroundColor:"rgb(171, 171, 171)"}}>
                    Пошук
                </Button>
            </Box>

            <Grid container spacing={4} padding={2}>
                {movies.map((movie) => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ 
                 transition: "transform 0.2s ease-in-out", 
                 '&:hover': { transform: 'scale(1.05)' }, 
                 boxShadow: 3, 
                 borderRadius: "8px", 
                 backgroundImage: "linear-gradient(to bottom,rgb(255, 255, 255),rgb(0, 0, 0))", 
}}>

                            <CardMedia
                                component="img"
                                height="350"
                                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                sx={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
                                onClick={() => navigate(`/movie/${movie.id}`)}
                            />
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                    {movie.title}
                                </Typography>
                                <Box sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                                    
                                    <IconButton 
                                        onClick={() => handleLike(movie)} 
                                        sx={{ 
                                            color: likedMovies.some((m) => m.id === movie.id) ? "red" : "gray", 
                                            '&:hover': { color: 'red' },
                                        }}>
                                        {likedMovies.some((m) => m.id === movie.id) ? <Favorite /> : <FavoriteBorder />}
                                    </IconButton >
                                </Box>
                            </CardContent >
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default SearchPage;
