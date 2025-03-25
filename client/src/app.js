const allMovies = document.getElementById("allMovies");
async function fetchMovies() {
  const response = await fetch("http://localhost:8080/allmovies");
  const allMoviesData = await response.json();
}
fetchMovies();

const moviesGenres = ["Superhero", "Sci-Fi", "Comedy", "Action"];

async function getMoviesByGenre(genre) {
  const response = await fetch(
    `http://localhost:8080/moviesbygenre?genre=${genre}`
  );

  const data = await response.json();
  return data;
}

const allMoviesContainer = document.getElementById("allMoviesContainer");

function displayMovies() {
  moviesGenres.forEach(async function (genre) {
    const movies = await getMoviesByGenre(genre);
    const genreContainer = document.createElement("section");
    const individualMovieImg = document.createElement("img");
    const currentGenreH2 = document.createElement("h2");
    const shuffleButton = document.createElement("button");
    shuffleButton.textContent = "Shuffle";
    shuffleButton.addEventListener("click", function () {
      individualMovieImg.src =
        movies[Math.floor(Math.random() * movies.length)].image;
    });
    genreContainer.appendChild(currentGenreH2);
    genreContainer.className = "genreContainer";
    currentGenreH2.textContent = genre;
    genreContainer.appendChild(shuffleButton);

    genreContainer.id = `section-${genre.toLowerCase()}`;

    individualMovieImg.src =
      movies[Math.floor(Math.random() * movies.length)].image;
    genreContainer.appendChild(individualMovieImg);
    allMoviesContainer.appendChild(genreContainer);
  });
}

displayMovies();


const messageForm = document.querySelector("#movieForm");

messageForm.addEventListener("submit", handleSubmitMessageForm);


function handleSubmitMessageForm(event) {
  event.preventDefault();
  let movieName = document.getElementById("suggestions").value;
let responseMessage = document.getElementById("responseMessage");

if (movieName.trim() !== "movieName") {
 responseMessage.textContent = `Thank you for recommending "${movieName}". Tune in for further developments!`
}
     

  const formData = new FormData(messageForm);
  const formValues = Object.fromEntries(formData);

  fetch("http://localhost:8080/newmovie", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify( formValues ),
  });
  messageForm.reset() 

}

