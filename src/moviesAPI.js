import axios from "axios";

const url = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US';
const options = {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMmIwM2YxNjk5MmNjMjIxOTMyYjUxNDJkY2YwZDg5ZSIsIm5iZiI6MTc0MjMxODIyOS41NTMsInN1YiI6IjY3ZDlhYTk1NDFkOTgzMTMzMjE3ZGJiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KIgr0OOK0CzeajrfPqmhF3bfrBGJqe9fr5_8WPzEFWg'
  }
};

export async function  fetchMovies () {
    const response = await axios.get(url, options);
    return response.data;
}
 

export async function fetchMoviesById (movieId) {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, options);
    return response.data;
}

export async function fetchReviewsById (movieId) {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, options);
    return response.data.results;
}

export async function fetchCastsById (movieId) {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, options);
    return response.data.cast;
}

export async function fetchMoviesByQuery (query) {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}`, options);
    return response.data.results;
}

