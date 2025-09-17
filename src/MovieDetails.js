import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(`/api/movies/${id}`);
      const payload = await res.json();
      setMovie(payload.data);
    }
    fetchMovie();
  }, [id]);
  if (!movie) return <p className="loading">Loading...</p>;
  let localizedDate = movie.release_date;
  if (localizedDate && localizedDate.includes("/")) {
    const [day, month, year] = movie.release_date.split("/");
    localizedDate = new Date(`20${year}-${month}-${day}`).toLocaleDateString(
      navigator.language
    );
  }
  return (
    <div className="movie-details">
      <div className="details-card" style={{justifyContent:"center"}}>
        <div className="info">
          <h2>{movie.title}</h2>
          {movie.tagline && <p className="tagline">“{movie.tagline}”</p>}
          <p><strong>Overview:</strong> {movie.overview || "No overview available"}</p>
          <p><strong>Release Date:</strong> {localizedDate || "Unknown"}</p>
          <p><strong>Runtime:</strong> {movie.runtime || "?"} minutes</p>
          <p><strong>Status:</strong> {movie.status || "N/A"}</p>
          <p><strong>Rating:</strong> ⭐ {movie.vote_average || 0} / 10</p>
          <p><strong>Votes:</strong> {movie.vote_count || 0}</p>
        </div>
      </div>
      <Link to="/" className="btn btn-primary mt-3">Back to Movies List</Link>
    </div>
  );
}
export default MovieDetails;