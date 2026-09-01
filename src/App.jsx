import "./App.css";
import { useState, useEffect, useMemo } from "react";
import MovieCard from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState("all movies");
  const [sortOrder, setSortOrder] = useState("newest");

  // async function to fetch all movies in first page of TMDB
  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
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

  // async function to fetch all possible genres for movies
  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error getting all genres", error);
    }
  };

  // fetching movies and genres. Plus setting initial state
  useEffect(() => {
    fetchMovies().then((m_data) => {
      setMovies(m_data.results);
    });

    fetchGenres().then((g_data) => {
      setGenres(g_data.genres);
    });
  }, []);

  // filtering based on genre
  const selectedMovies = useMemo(() => {
    return genreId === "all movies"
      ? movies
      : movies.filter((m) => m.genre_ids.includes(Number(genreId)));
  }, [movies, genreId]);

  // sorting by year
  const sortedMovies = useMemo(() => {
    return [...selectedMovies].sort((a, b) =>
      sortOrder === "newest"
        ? b.release_date.localeCompare(a.release_date)
        : a.release_date.localeCompare(b.release_date),
    );
  }, [selectedMovies, sortOrder]);

  return (
    <>
      <h1>Find Your Next Movie Pick!</h1>

      <div className="filter-bar">
        <select
          onChange={(e) => setGenreId(e.target.value)}
          className="filter-select"
        >
          <option value="all movies">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setSortOrder(e.target.value)}
          className="filter-select"
        >
          <option value="none">Sort by</option>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      {sortedMovies.length === 0 ? (
        <div className="empty-state">
          <p className="empty_title">No movies found :(</p>
          <p className="empty-desc">
            Unfortunately we don't have recent movies in that genre. Please try
            another one
          </p>
        </div>
      ) : (
        <div className="movie-grid">
          {sortedMovies.map((movie, index) => (
            <MovieCard
              key={index}
              title={movie.title}
              poster_img={movie.poster_path}
              year={movie.release_date}
              overview={movie.overview}
            ></MovieCard>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
