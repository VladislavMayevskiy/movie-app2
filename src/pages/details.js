import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, getRecommendations, getPopularMovies, getImageUrl } from "../api/tmdb";
import { Button, Toolbar } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";




function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [backupMovies, setBackupMovies] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    getMovieDetails(id).then(setMovie);

    getRecommendations(id)
      .then((data) => {
        if (data?.results?.length > 0) {
          setRecommendations(data.results);
        } else {
          loadBackupMovies(); 
        }
      })
      .catch((error) => {
        console.error("Помилка завантаження рекомендацій:", error);
        loadBackupMovies();
      });
  }, [id]);

  const loadBackupMovies = () => {
    getPopularMovies()
      .then((data) => setBackupMovies(data.results))
      .catch((error) => console.error("Помилка завантаження популярних фільмів:", error));
  };

  const moviesToShow = recommendations.length > 0 ? recommendations : backupMovies;

  if (!movie) return <p>Завантаження...</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <Toolbar>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            "&:hover": { backgroundColor: "rgb(0, 0, 0)" },
          }}
        >
          Назад
        </Button>
      </Toolbar>

      <h1 style={{ textAlign: "center" }}>{movie.title}</h1>

      <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          style={{ width: "300px", borderRadius: "10px" }}
        />
        <div>
          <p><strong>Опис:</strong> {movie.overview}</p>
          <p><strong>Рейтинг:</strong> {movie.vote_average}</p>
          <p><strong>Дата виходу:</strong> {movie.release_date}</p>
        </div>
      </div>

      <h2 style={{ marginTop: "30px" }}>
        {recommendations.length > 0 ? "Рекомендовані фільми" : "Популярні фільми"}
      </h2>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={4}
        breakpoints={{
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          480: { slidesPerView: 1 },
        }}
        style={{ marginTop: "20px", paddingBottom: "20px" }}
      >
        {moviesToShow.map((rec) => (
          <SwiperSlide key={rec.id}>
            <div
              onClick={() => navigate(`/movie/${rec.id}`)}
              style={{ cursor: "pointer", textAlign: "center" }}
            >
              {rec.poster_path ? (
                <img
                  src={getImageUrl(rec.poster_path)}
                  alt={rec.title}
                  style={{ width: "100%", borderRadius: "10px" }}
                />
              ) : (
                <p>Зображення недоступне</p>
              )}
              <p>{rec.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MovieDetails;
