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
    dots: true, 
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000, 
  };
  if (!movie) return <p>Завантаження...</p>;

  return (
    <div >
      <h1 >{movie.title}</h1>
      <div >
        <Toolbar sx={{ ml: 146, mt: -8, backgroundColor: "rgb(255, 255, 255)" }}>
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
        />
    <div >
          <p ><strong>Опис:</strong> {movie.overview}</p>
          <p ><strong>Рейтинг:</strong> {movie.vote_average}</p>
          <p ><strong>Дата виходу:</strong> {movie.release_date}</p>
        </div>
      </div>
      <h2 >Рекомендовані фільми</h2>
      {Array.isArray(recommendations) && recommendations.length > 0 ? (
        <Slider {...caruselSlider} className="mt-6">
          {recommendations.map((rec) => (
            <div key={rec.id} >
              <img
                src={getImageUrl(rec.poster_path)}
                alt={rec.title}
               
              />
              <p >{rec.title}</p>
            </div>
          ))}
        </Slider>
      ) : (
        <p >Немає рекомендацій</p>
      )}
    </div>
  );
}

export default MovieDetails;
