import React, { useEffect, useState } from "react";
import { Toolbar, Typography, Grid, Card, CardMedia, CardContent, Pagination, Button, IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./details";

const API_KEY = "a9985d790ed03fe28c91a2295f212fde";
const API_URL_POPULAR = "https://api.themoviedb.org/3/movie/popular";

function Popular() {
    const [movies, setMovies] = useState([]);
    const [likedMovies, setLikedMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(API_URL_POPULAR, {
                    params: {
                        api_key: API_KEY,
                        language: "uk-UA",
                        page: page,
                    },
                });
                setMovies(response.data.results);
                setTotalPages(response.data.total_pages > 100 ? 100 : response.data.total_pages);
            } catch (error) {
                console.error("Помилка завантаження фільмів:", error);
            }
        };
        fetchMovies();

        const savedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];
        setLikedMovies(savedMovies.map(movie => movie.id));
    }, [page]);

    const handleLike = (movie) => {
        let updatedLikedMovies = [...likedMovies];
        let savedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];

        if (likedMovies.includes(movie.id)) {
            updatedLikedMovies = likedMovies.filter(id => id !== movie.id);
            savedMovies = savedMovies.filter(savedMovie => savedMovie.id !== movie.id);
        } else {
            updatedLikedMovies.push(movie.id);
            savedMovies.push(movie);
        }
        setLikedMovies(updatedLikedMovies);
        localStorage.setItem("likedMovies", JSON.stringify(savedMovies));
    };
    return (
        <div style={{ backgroundColor: "rgb(18, 18, 18)", minHeight: "100vh", paddingBottom: "20px" }}>
            <Toolbar sx={{ backgroundColor: "rgb(28, 28, 28)", color: "rgb(255, 255, 255)", boxShadow: 1 }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>Популярні фільми</Typography>
                <Button variant="contained" color="primary" onClick={() => navigate("/search")} sx={{ margin: "0 10px" }}>
                    Пошук фільмів
                </Button>
                <Button variant="contained" color="success" onClick={() => navigate("/saved")} sx={{ margin: "0 10px" }}>
                    Вподобані
                </Button>
            </Toolbar>

            <Grid container spacing={3} padding={3}>
                {movies.map((movie) => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                        <Card sx={{
                            cursor: "pointer",
                            position: "relative",
                            backgroundColor: "rgb(30, 30, 30)",
                            borderRadius: "10px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            '&:hover': {
                                transform: "scale(1.05)",
                                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.6)"
                            }
                        }}>
                            <CardMedia
                                component="img"
                                height="300"
                                image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder.jpg"}
                                alt={movie.title}
                                onClick={() => navigate(`/movie/${movie.id}`)}
                                sx={{ borderRadius: "10px 10px 0 0" }}
                            />
                            <CardContent sx={{ padding: "16px", color: "rgb(255, 255, 255)" }}>
                                <Typography variant="h6" noWrap sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>{movie.title}</Typography>
                                <IconButton onClick={() => handleLike(movie)} sx={{ position: "absolute", top: "8px", right: "8px", color: likedMovies.includes(movie.id) ? "rgb(255, 0, 0)" : "rgb(169, 169, 169)" }}>
                                {likedMovies.includes(movie.id) ? <Favorite /> : <FavoriteBorder />}
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
          <Pagination 
                count={totalPages}
                page={page}
                onChange={( value) => setPage(value)}
                color="primary"
                sx={{ display: "flex", justifyContent: "center", margin: "20px 0", backgroundColor:"rgb(96, 96, 96)" }}
            />
        </div>
    );
}

export default Popular;
