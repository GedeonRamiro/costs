const ServiceCard = ({ id, name, cost, description }) => {
    return(
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Custo total:</span> R${cost}
            </p>
            <p>{description}</p>
            <div className={styles.project_card_actions}>
                <button>
                    Excluir
                </button>
            </div>
        </div>
    )
}

export default ServiceCard