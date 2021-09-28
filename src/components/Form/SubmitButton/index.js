import styles from './style.module.css'

const SubmitButton = ({ text }) => {
    return (
        <div>
            <button className={styles.btn}>{text}</button>
        </div>
    )
}

export default SubmitButton