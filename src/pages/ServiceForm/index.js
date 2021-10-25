import styles from '../ProjectForm/style.module.css';
import Input from '../../components/Form/Input/'
import SubmitButton from '../../components/Form/SubmitButton/'
import { useState } from "react"

const ServiceForm = ({ btnText, projectData, handleSubmit }) => {

  
  const [service, setService] = useState({})
  
  console.log(projectData)

    function submit(e) {
      e.preventDefault()
      projectData.services.push(service)
      handleSubmit(projectData)
    }

    function handleChange(e) {
      setService({...service, [e.target.name]: e.target.value })
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