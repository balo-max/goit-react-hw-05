import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { fetchCastsById } from '../../moviesAPI';
import HashLoader from 'react-spinners/HashLoader'

import css from './MovieCast.module.css'
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const defaultImg = "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function MovieCast() {
    const [casts, setCasts] = useState([]);
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const { movieId } = useParams();
 
    useEffect(() => {
        if (!movieId) return;
        async function getCastsById() {
            try {
                setError(false)
                setNotFound(false)
                setLoader(true)
                
                const data = await fetchCastsById(movieId)
                setLoader(false)

                if (data.length === 0) return setNotFound(true);

                setCasts(data);
                setTimeout(() => {
                    window.scrollBy({
                        top: 800,
                        behavior: "smooth"
                    });
                }, 300);
                
            } catch (err) {
                console.log(err);
                setError(true)
            } finally {
                setLoader(false)
            }
        };
        getCastsById();
    }, [movieId]);

    return (
        <div>
            <h2 className={css.title}>Actors:</h2>
            {error && <ErrorMessage />}
            {loader && <HashLoader color="#ab2020" cssOverride={override}/>}
            {casts.length !== 0 && <ul className={css.castsList}>
                {casts.map((cast) => (
                    <li className={css.castsItem} key={cast.id}>
                        <img className={css.castImg} src={cast.profile_path ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}` : defaultImg} alt={`photo ${cast.name}`} width='200' height='300' />
                        <div>
                            <h3 className={css.castName}>{cast.name}</h3>
                            <p>Сharacter: {cast.character}</p>
                        </div>
                    </li>
                ))}
            </ul>} {notFound && <p>Nothing is found</p>}
        </div>
    );
}