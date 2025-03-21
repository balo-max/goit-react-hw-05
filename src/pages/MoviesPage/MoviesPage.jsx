import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMoviesByQuery } from '../../moviesAPI';
import FormSearch from "../../components/FormSearch/FormSearch";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import toast from "react-hot-toast";


export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') ?? '';

    const handleSubmit = value => {
        const nextParams = new URLSearchParams(searchParams);
        nextParams.set('query', value);
        setSearchParams(nextParams);
    };

    useEffect(() => {
        if (!query) return;
        async function getMoviesByQuery() {
            try {
                setError(false)
                const data = await fetchMoviesByQuery(query);
                if (data.length === 0) return toast.error('Nothing found!');
                setMovies(data);
            } catch (err) {
                console.log(err);
                setError(true);
            }
        }
        getMoviesByQuery();
    }, [query]);

    return (
        <>
            <FormSearch onSubmit={handleSubmit} />
            {error && <ErrorMessage/>}
            {movies.length !== 0 && <MovieList movies={movies}/>}
        </>
    )
}