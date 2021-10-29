import { useState } from "react"
import styles from './style.module.css'
import ProjectForm from '../ProjectForm/'
import { useHistory } from 'react-router'
import Message from '../../layout/Message/'
import validadeCreateProject from '../../utils/validadeCreateProject'

const NewProject = () => {

    const history = useHistory()

    const [message, setMessage] = useState()
    const [type, setType] = useState('')

      const setProject = async (project) => {
        console.log(project)
        setMessage('')
        const validation = validadeCreateProject(project.name, project.budget, project.category)         
        
        if(typeof validation === 'string'){
            setMessage(validation)
            setType('erro')
            return false
        }

        try {
            await fetch('http://localhost:5000/projects', {
                method: 'POST',
                body: JSON.stringify(project),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
         
            history.push('/projects', {message: 'Projeto criado com sucesso!'})

        } catch (error) {
                console.log(error)
                console.log('Algo deu errado no cadastro!')
        }
    
    }

    const createProject = (project) => {
        project.cost = 0
        project.services = []
        setProject(project)
    }


    return (
      
            <div className={styles.newproject_container}>
            {message && <Message type={type} msg={message} />} 
                <h1 className={styles.newproject_h1}>Criar Projeto</h1>
                <p className={styles.newproject_p}>Crie sei prpjeto para depois adicionar o projeto</p>
                <ProjectForm handleSubmit={createProject} btntext="Criar Projeto" />
            </div>
    )
}

export default NewProject