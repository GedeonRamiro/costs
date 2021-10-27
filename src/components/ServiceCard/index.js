import styles from '../../components/CardProject/style.module.css'
import { FiDelete } from 'react-icons/fi'

const ServiceCard = ({ id, name, cost, description, handleRemove }) => {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, cost)
        
    }

    return(
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Custo total:</span> R${cost}
            </p>
            <p>{description}</p>
            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                    <FiDelete />
                    Excluir
                </button>
            </div>
        </div>
    )
}

export default ServiceCard