import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getMovieDetails, getRecommendations, getImageUrl } from "../api/tmdb";
import { Button, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMovieDetails(id).then(setMovie);
    getRecommendations(id).then(setRecommendations);
  }, [id]);

  const caruselSlider = {
    dots: true, // Додаємо пагінацію для каруселі
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true, // Автоперемикання слайдів
    autoplaySpeed: 3000, // Затримка між слайдами
  };

  if (!movie) return <p>Завантаження...</p>;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-black to-gray-800 text-white">
      <h1 className="text-center text-4xl font-semibold mb-4 text-yellow-400">{movie.title}</h1>
      <div className="flex flex-col items-center mt-6 max-w-5xl mx-auto">
        <Toolbar sx={{ ml: 146, mt: -8, backgroundColor: "transparent" }}>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{
              mb: 4,
              alignSelf: "flex-start",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgb(0, 0, 0)",
              },
            }}
          >
            Назад
          </Button>
        </Toolbar>

        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-72 rounded-lg shadow-lg mb-4 transition-transform duration-300 hover:scale-105"
        />

        <div className="mt-4 text-center">
          <p className="text-lg mb-2"><strong>Опис:</strong> {movie.overview}</p>
          <p className="text-lg mb-2"><strong>Рейтинг:</strong> {movie.vote_average}</p>
          <p className="text-lg mb-2"><strong>Дата виходу:</strong> {movie.release_date}</p>
        </div>
      </div>

      <h2 className="mt-8 text-2xl font-semibold text-yellow-400">Рекомендовані фільми</h2>
      {Array.isArray(recommendations) && recommendations.length > 0 ? (
        <Slider {...caruselSlider} className="mt-6">
          {recommendations.map((rec) => (
            <div key={rec.id} className="flex flex-col items-center p-4">
              <img
                src={getImageUrl(rec.poster_path)}
                alt={rec.title}
                className="w-48 h-72 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
              />
              <p className="text-center mt-2 text-white font-semibold">{rec.title}</p>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-white">Немає рекомендацій</p>
      )}
    </div>
  );
}

export default MovieDetails;
