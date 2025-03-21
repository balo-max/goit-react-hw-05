import css from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { fetchMovies } from '../../moviesAPI';


import MovieList from '../../components/MovieList/MovieList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getMovies() {
            try {
                setError(false)

                const response = await fetchMovies();
                const moviesData = response.results;

                setMovies(moviesData)
            } catch (err) {
                console.log(err);
                setError(true);
            }
        }
        getMovies();
    }, []);

    return (
        <div>
            <h1 className={css.mainTitle}>Tranding now:</h1>
            {error && <ErrorMessage/>}
            {movies.length !== 0 && <MovieList movies={movies} />}
        </div>
    )
}