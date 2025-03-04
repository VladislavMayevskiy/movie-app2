import axios from "axios";

const API_KEY = "a9985d790ed03fe28c91a2295f212fde"; 
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export const getPopularMovies = async (page = 1) => {
  const { data } = await api.get("/movie/popular", { params: { page } });
  return data;
};

export const searchMovies = async (query, page = 1) => {
  const { data } = await api.get("/search/movie", { params: { query, page } });
  return data;
};

export const getMovieDetails = async (id) => {
  const { data } = await api.get(`/movie/${id}`);
  return data;
};

export const getRecommendations = async (id) => {
  const { data } = await api.get(`/movie/${id}/recommendations`);
  return data;
};
export function getImageUrl(path) {
  return `https://image.tmdb.org/t/p/w500${path}`;
}
