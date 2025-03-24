const allMovies = document.getElementById("allMovies")
async function fetchMovies() {
    const response = await fetch("http://localhost:8080/allmovies");
    const allMoviesData = await response.json();
}
fetchMovies();