import css from './ErrorMessage.module.css'

export default function ErrorMessage() {
    return (
        <div><p className={css.error}>Oops, something's wrong... try reloading the site</p></div>
    )
}