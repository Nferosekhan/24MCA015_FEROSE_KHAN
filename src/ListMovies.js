import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function ListMovies() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const moviesPerPage = 8;
  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch("/api/movies");
      const payload = await res.json();
      setMovies(payload.data);
    }
    fetchMovies();
  }, []);
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  return (
    <div className="movies-wrapper">
      <h2 className="page-title">
        🎬 Mov
        <span style={{ borderBottom: "6px solid royalblue", paddingBottom: "10px" }}>
          ies Col
        </span>
        lection
      </h2>
      <div className="search-bar" style={{ marginBottom: "20px", textAlign: "center", display: "flex", justifyContent: "center", textAlign: "center" }}>
        <input type="search" className="form-control form-control-sm mt-3" placeholder="Search movie by title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{padding: "10px",maxWidth: "250px",borderRadius: "6px",border: "1px solid #ccc",fontSize: "16px"}}/>
      </div>
      <div className="movies-container">
        {currentMovies.length > 0 ? (
          currentMovies.map((movie) => (
            <div key={movie.id} className="movie-card" style={{ backgroundColor: "#8dfff4" }}>
              <h3 style={{ color: "#000000" }}>{movie.title}</h3>
              <p className="tagline">{movie.tagline || "No tagline"}</p>
              <p style={{ color: "#000000" }}>⭐ {movie.vote_average} / 10</p>
              <Link to={`/movies/${movie.id}`} className="btn btn-dark">
                View Details →
              </Link>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>No movies found</p>
        )}
      </div>
      {filteredMovies.length > 0 && (
        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
export default ListMovies;