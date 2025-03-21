import { Outlet, useParams, NavLink, useLocation, Link } from "react-router-dom";
import { fetchMoviesById } from '../../moviesAPI';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";

import HashLoader from 'react-spinners/HashLoader'

import css from './MovieDetailsPage.module.css';
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


export default function MovieDetailsPage() {
    const [error, setError] = useState(false);
    const { movieId } = useParams();
    const location = useLocation();
    const backLinkLocation = useRef(location.state ?? '/movies');

    const [currentMovie, setCurrentMovie] = useState(null);
    const [loader, setLoader] = useState(false);
    
    useEffect(() => {
            if (!movieId) return;
            async function getMoviesById() {
                try {
                    setError(false)
                    setLoader(true);
                    const response = await fetchMoviesById(movieId);
                    setCurrentMovie(response)
                } catch (err) {
                    console.log(err);
                    setError(true)
                } finally {
                    setLoader(false);
                }
            }
            getMoviesById();
        }, [movieId]);

    return (
        <>
            {error && <ErrorMessage/>}
            {currentMovie && <div className={css.backLinkWrapper}>
                <Link to={backLinkLocation.current} className={css.backLink}><FaArrowLeft /> Go back</Link>
            </div>}
            {loader && <HashLoader color="#ab2020" cssOverride={override} />}
            {currentMovie && <div className={css.wrapper}>
                <img src={`https://image.tmdb.org/t/p/w500/${currentMovie.poster_path}`} alt='poster' />
                <div className={css.descriptionWrapper}>
                    <h2 className={css.title}>{currentMovie.title}</h2>
                    <ul className={css.descriptionWrapper}>
                        <li><p className={css.text}>Release date: {currentMovie.release_date
                        }</p></li>
                        <li><p className={css.text}>Overview: <br />{currentMovie.overview}</p></li>
                        <li><p className={css.text}>Rating: <span>{currentMovie.vote_average}</span></p></li>
                    </ul>
                </div>
            </div>}
            {currentMovie && <div>
                <ul className={css.navList}>
                    <li>
                        <NavLink className={css.navLink} to='cast'>Cast
                            <IoIosArrowDown className={css.navIcon} />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={css.navLink} to='reviews'>Reviews
                            <IoIosArrowDown className={css.navIcon} />
                        </NavLink>
                    </li>
                </ul>
                <Outlet />
            </div>}
            
        </>
    );
}