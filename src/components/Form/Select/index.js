import styles from './style.module.css';

const Select = ({ text, name, options, handleOnChange, value }) => {
    return (
        <div className={styles.form_control}>
                <label htmlFor={name}>{text}:</label>
                <select 
                    name={name}
                    id={name} 
                    onChange={handleOnChange}
                    value={value || ''} 
                >
                   <option className={styles.optionTitle }>Selecione um opção</option> 
                    {options.map(categorie => (
                        <option key={categorie.id} value={categorie.id}>
                            {categorie.name}
                        </option>   
                    ))}
                </select>
        </div>
    )
}

export default Select