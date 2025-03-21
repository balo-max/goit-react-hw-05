import toast, { Toaster } from 'react-hot-toast';

import css from './FormSearch.module.css'

export default function FormSearch({onSubmit}) {
    
    const handledSubmit = (event) => {
        event.preventDefault();

        const inputValue = event.target.elements.search.value.trim();

        if (!inputValue) {
            return toast.error('Please write the search that interests you.');
        };

        onSubmit(inputValue);
        event.target.reset();
}
    
    
    return (
        <>
            <form onSubmit={handledSubmit}>
                <input className={css.inputSearch} type="text" name="search" placeholder="Search movies..." autoFocus />
                <button className={css.btnSearch} type="submit">Search</button>
            </form>
            <Toaster />
        </>
    );
}

