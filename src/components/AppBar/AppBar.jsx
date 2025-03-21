import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './AppBar.module.css'

const buildLinkClass = ({ isActive }) => {
    return clsx(css.navLink, isActive && css.active);
};

export default function AppBar() {
    return (
        <header className={css.header}>
            <div className={css.logoWrapper}>
                <NavLink to="/" className={css.logoLink}><p className={css.logo}>Go<span className={css.logoSpan}>Movies</span>Search</p></NavLink>
            </div>

            <nav className={css.navigation}>
                <NavLink to="/" className={buildLinkClass}>Home</NavLink>
                <NavLink to="/movie" className={buildLinkClass}>Movies Search</NavLink>
            </nav>
        </header>
    )
}