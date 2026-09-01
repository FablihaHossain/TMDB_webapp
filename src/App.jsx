import "./App.css";
import { useState, useEffect, useMemo } from "react";
import MovieCard from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState("all movies");

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

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=62df2cd3a4881de6558bc68cd67cca20",
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error getting all genres", error);
    }
  };

  // fetching movies and setting initial state
  useEffect(() => {
    fetchMovies().then((m_data) => {
      setMovies(m_data.results);
    });

    fetchGenres().then((g_data) => {
      setGenres(g_data.genres);
      console.log("g", genres);
    });
  }, []);

  const selectedMovies = useMemo(() => {
    return genreId === "all movies"
      ? movies
      : movies.filter((m) => m.genre_ids.includes(Number(genreId)));
  }, [movies, genreId]);

  return (
    <>
      <h1>Find Your Next Movie Pick!</h1>

      <section>
        <select onChange={(e) => setGenreId(e.target.value)}>
          <option value="all movies">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </section>
      <div className="movie-grid">
        {selectedMovies.map((movie, index) => (
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
