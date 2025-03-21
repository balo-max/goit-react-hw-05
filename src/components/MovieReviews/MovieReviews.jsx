import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { fetchReviewsById } from '../../moviesAPI';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import css from './MovieReviews.module.css'
import { HashLoader } from 'react-spinners';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function MovieReviews() {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const { movieId } = useParams();

    useEffect(() => {
        if (!movieId) return;
        async function getReviewsById() {
            try {
                setError(false)
                setNotFound(false)
                setLoader(true)

                const data = await fetchReviewsById(movieId)

                setLoader(false)

                if (data.length === 0) return setNotFound(true);

                setReviews(data);

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
        }
        getReviewsById();
    }, [movieId]);

    return (
        <div>
            <h2 className={css.title}>Users reviews:</h2>
            {error && <ErrorMessage />}
            {loader && <HashLoader color="#ab2020" cssOverride={override}/>}
            {reviews.length !== 0 && <ul className={css.reviewList}>
                {reviews.map((review =>
                    <li className={css.reviewItem} key={review.id}>
                        <h3 className={css.user}>{review.author}</h3>
                        <p className={css.text}>{review.content}</p>
                    </li>
                ))}
            </ul>} {notFound && <p>Nothing is found</p>}
        </div>
    )
}