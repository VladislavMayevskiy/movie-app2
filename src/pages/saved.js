import React, { useState, useEffect } from "react";
import { Toolbar, Typography, Grid, Card, CardMedia, CardContent, IconButton, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

function Saved() {
    const [likedMovies, setLikedMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];
        setLikedMovies(savedMovies);
    }, []);

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
            {/* Тулбар */}
            <Toolbar sx={{ backgroundColor: "#000", color: "#fff" }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => navigate("/")} 
                    sx={{
                        fontWeight: 'bold', 
                        backgroundColor: "#fff", 
                        color: "#000", 
                        '&:hover': { backgroundColor: "#f1f1f1" }
                    }}
                >
                    Назад
                </Button>
                <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center", fontWeight: 'bold' }}>
                    Вподобані фільми
                </Typography>
            </Toolbar>

            {/* Список вподобаних фільмів */}
            <Box sx={{ padding: "20px" }}>
                {likedMovies.length === 0 ? (
                    <Typography variant="h6" sx={{ textAlign: "center" }}>Немає вподобаних фільмів</Typography>
                ) : (
                    <Grid container spacing={4}>
                        {likedMovies.map((movie) => (
                            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                                <Card sx={{ 
                                    backgroundColor: "#1e1e1e", 
                                    borderRadius: "8px", 
                                    boxShadow: 3, 
                                    transition: "transform 0.2s ease-in-out",
                                    '&:hover': { transform: 'scale(1.05)' }
                                }} onClick={() => navigate(`/movie/${movie.id}`)}>
                                    <CardMedia
                                        component="img"
                                        height="350"
                                        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        sx={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
                                    />
                                    <CardContent sx={{ textAlign: "center" }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                            {movie.title}
                                        </Typography>
                                        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                                            <IconButton 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleLike(movie);
                                                }} 
                                                sx={{
                                                    color: likedMovies.some((m) => m.id === movie.id) ? "red" : "gray", 
                                                    '&:hover': { color: 'red' }
                                                }}
                                            >
                                                {likedMovies.some((m) => m.id === movie.id) ? <Favorite /> : <FavoriteBorder />}
                                            </IconButton>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </div>
    );
}

export default Saved;
