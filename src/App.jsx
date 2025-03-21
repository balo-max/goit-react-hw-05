// import { useState } from 'react'
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import HashLoader from 'react-spinners/HashLoader'
import AppBar from './components/AppBar/AppBar'
import './App.css'

const Home = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'));

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function App() {
  return (
    <>
      <AppBar />
      
      <Suspense fallback={<HashLoader color="#ab2020" cssOverride={override} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<MoviesPage />} />
          <Route path="/movie/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App
