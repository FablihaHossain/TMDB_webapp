const MovieCard = ({ title, poster_img, year }) => {
  return (
    <div>
      <p>{title}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_img}`}
        height={100}
        width={100}
      ></img>
      <p>{year}</p>
    </div>
  );
};

export default MovieCard;
