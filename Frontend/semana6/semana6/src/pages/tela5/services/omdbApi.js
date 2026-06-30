const API_KEY = "fc2aafd8";
const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(movieName) {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${movieName}`
  );

  const data = await response.json();

  return data;
}