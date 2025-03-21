import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import css from './MovieList.module.css'

const defaultImg = "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

export default function MovieList({ movies }) {

    const location = useLocation();

    return (
        <ul className={css.movieList}>
            {movies.map((movie) => (
                <li className={css.movieItem} key={movie.id}>
                    <Link to={`/movie/${movie.id}`} state={location} className={css.movieLink}>
                        <div className={css.movieItemWrapper}>
                            <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : defaultImg} alt="poster" width='300' height='450' />
                            <p>{movie.title}</p>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}