import styles from '../ProjectForm/style.module.css';
import Input from '../../components/Form/Input/'
import SubmitButton from '../../components/Form/SubmitButton/'

const ServiceForm = ({ handleChange, btnText, projetData }) => {

    function submit() {

    }

    function handleChange(e) {

    }


    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
              type='text'
              text='Nome do serviço'
              name='name'
              placeholder='Insira o nome do serviço'
              handleOnChange={handleChange}
            />
            <Input 
              type='number'
              text='Custo do serviço'
              name='cost'
              placeholder='Insira o valor total'
              handleOnChange={handleChange}
            />
             <Input 
              type='text'
              text='Descrição do serviço'
              name='description'
              placeholder='Descrever o serviço'
              handleOnChange={handleChange}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ServiceForm