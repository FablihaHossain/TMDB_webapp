const MovieCard = ({ title, poster_img, year }) => {
  return (
    <div className="movie_card">
      <div className="poster">
        <img
          src={`https://image.tmdb.org/t/p/w342/${poster_img}`}
          alt={title}
        ></img>
      </div>

      <div className="overlay">
        <div className="rule-top"></div>
        <p className="title">{title}</p>
        <span className="year">{year}</span>
      </div>
    </div>
  );
};

export default MovieCard;
