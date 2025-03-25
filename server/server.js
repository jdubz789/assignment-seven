import express from "express"; 
const app = express();
import pg from 'pg'
import dotenv from 'dotenv'
import cors from 'cors'

app.use(express.json());
app.use(cors());
dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STRING
});


app.listen(8080, function () {
    console.log("Server is listening on port 8080...");
  });

app.get("/", function (request, response) {
  response.json(
    "This is the route for the movies database"
  );
} );

app.get("/allmovies", async function (request, response) {
  const allMovies = await db.query(`SELECT * FROM movies`);
  console.log("allMovies response is", allMovies.rows);

  response.json(allMovies.rows);
});

app.get("/moviesbygenre", async function (request, response) {
  console.log("the genre request is", request.query.genre);
  const moviesByGenre = await db.query(`SELECT * FROM movies WHERE genre = $1`, [request.query.genre] )
  console.log("moviesbygenre is", moviesByGenre.rows);
  response.json(moviesByGenre.rows);
})

