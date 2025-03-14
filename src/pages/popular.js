import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";

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
        <div className="bg-gray-900 min-h-screen text-white">
            <header className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
                <h1 className="text-xl font-bold">Популярні фільми</h1>
                <div>
                    <button className="bg-yellow-200 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2" onClick={() => navigate("/search")}>Пошук</button>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded" onClick={() => navigate("/saved")}>Вподобані</button>
                </div>
            </header>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {movies.map((movie) => (
                    <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg relative">
                        <img
                            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder.jpg"}
                            alt={movie.title}
                            className="w-full h-80 object-cover cursor-pointer"
                            onClick={() => navigate(`/movie/${movie.id}`)}
                        />
                        <div className="p-4 flex justify-between items-center">
                            <h2 className="text-lg font-semibold truncate w-4/5">{movie.title}</h2>
                            <button onClick={() => handleLike(movie)} className="text-red-500 text-2xl">
                                {likedMovies.includes(movie.id) ? <FaHeart /> : <FaRegHeart />}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center my-6">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-l-lg"
                    disabled={page === 1}
                >
                    Назад
                </button>
                <span className="px-4 py-2 bg-gray-900">{page} / {totalPages}</span>
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-r-lg"
                    disabled={page === totalPages}
                >
                    Далі
                </button>
            </div>
        </div>
    );
}
export default Popular;