const allMovies = document.getElementById("allMovies");
async function fetchMovies() {
  const response = await fetch("https://assignment-seven.onrender.com/allmovies");
  const allMoviesData = await response.json();
}
fetchMovies();

const moviesGenres = ["Superhero", "Sci-Fi", "Comedy", "Action"];

async function getMoviesByGenre(genre) {
  const response = await fetch(
    `https://assignment-seven.onrender.com/moviesbygenre?genre=${genre}`
  );

  const data = await response.json();
  return data;
}

const allMoviesContainer = document.getElementById("allMoviesContainer");

function displayMovies() {
  moviesGenres.forEach(async function (genre) {
    const movies = await getMoviesByGenre(genre);

    const genreContainer = document.createElement("section");
    genreContainer.className = "genreContainer"

    const individualMovieImg = document.createElement("img");
    individualMovieImg.className= "individualMovieImg";

    const currentGenreH2 = document.createElement("h2");
    currentGenreH2.className= "currentGenreH2"

    const shuffleButton = document.createElement("button");
    shuffleButton.textContent = "Shuffle";
    shuffleButton.className= "shuffleButton";

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

    genreContainer.appendChild(currentGenreH2);
    genreContainer.appendChild(shuffleButton);

  });
}

displayMovies();

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const isOpen = button.classList.contains("active");

    
    document.querySelectorAll(".faq-question").forEach((btn) => {
      btn.classList.remove("active");
      btn.nextElementSibling.style.display = "none";
    });

    
    if (!isOpen) {
      button.classList.add("active");
      answer.style.display = "block";
    }
  });
});

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

  fetch("https://assignment-seven.onrender.com/newmovie", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify( formValues ),
  });
  messageForm.reset() 

}

