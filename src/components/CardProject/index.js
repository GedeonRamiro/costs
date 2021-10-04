import { Link } from 'react-router-dom'
import { BiEdit } from 'react-icons/bi'
import { FiDelete } from 'react-icons/fi'
import style from './style.module.css'



const CardProject = ({ id, name, budget, category, handleRemove  }) => {

    const remove = e => {
        e.preventDefault()
        handleRemove(id)
    }

    return(
        <div className={style.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento: </span> R${budget}
            </p>
            <p className={style.category_text}>
                <span className={`${style[category.name.toLowerCase()]}`}></span> {category.name}
            </p>
            <div className={style.project_card_actions}>
                <Link to='/'>
                    <BiEdit size={20} /> Editar
                </Link>
                <button onClick={remove}>
                    <FiDelete size={20} /> Excluir
                </button>
            </div>

        </div>
    )
}

export default CardProject