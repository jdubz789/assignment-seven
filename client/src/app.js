
document
  .getElementById("movieForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let movieName = document.getElementById("movieInput").value;
    let responseMessage = document.getElementById("responseMessage");

    if (movieName.trim() !== "") {
      responseMessage.textContent = `Thank you for recommending "${movieName}". Tune in for further developments!`;
      document.getElementById("movieInput").value = ""; // Clear input after submission
    }
  });

const allMovies = document.getElementById("allMovies")
async function fetchMovies() {
    const response = await fetch("http://localhost:8080/allmovies");
    const allMoviesData = await response.json();
}
fetchMovies();

