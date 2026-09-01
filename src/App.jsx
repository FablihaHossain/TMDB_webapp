import "./App.css";
import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);

  // async function to fetch all movies in first page of TMDB
  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=62df2cd3a4881de6558bc68cd67cca20",
      );
      const data = await response.json();
      console.log("data", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch movies... :(", error);
    } finally {
      // continue
    }
  };

  // fetching movies and setting initial state
  useEffect(() => {
    fetchMovies().then((data) => {
      setMovies(data.results);
    });
  }, []);

  return (
    <>
      <h1>Find Your Next Movie Pick!</h1>
      <div></div>
      <div className="movie-grid">
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.title}
            poster_img={movie.poster_path}
            year={movie.release_date}
            overview={movie.overview}
          ></MovieCard>
        ))}
      </div>
    </>
  );
}

export default App;
