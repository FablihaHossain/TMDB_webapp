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
      console.log(data);
      setMovies(data.results);
    } catch (error) {
      console.error("Failed to fetch movies... :(", error);
    } finally {
      // continue
    }
  };

  // fetching movies and setting initial state
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <h1>Check out these cool movies!</h1>
      {movies.map((movie) => (
        <MovieCard
          title={movie.title}
          poster_img={movie.poster_path}
          year={movie.release_date}
        ></MovieCard>
      ))}
    </>
  );
}

export default App;
