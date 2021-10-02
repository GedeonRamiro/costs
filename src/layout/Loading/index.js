import style from './style.module.css'
import loading from '../../img/loading.svg'

const Loading = () => {
    return (
        <div className={style.loader_container}>
            <img className={style.loader} src={loading} alt='loading' cla />
        </div>
    )
}

export default Loading