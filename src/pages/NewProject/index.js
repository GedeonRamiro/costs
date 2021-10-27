import styles from './style.module.css'
import ProjectForm from '../ProjectForm/'
import { useHistory } from 'react-router'

const NewProject = () => {

    const history = useHistory()

      const setProject = async (project) => {

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

    const createPost = (project) => {
        project.cost = 0
        project.services = []
        setProject(project)
    }


    return (
        <div className={styles.newproject_container}>
            <h1 className={styles.newproject_h1}>Criar Projeto</h1>
            <p className={styles.newproject_p}>Crie sei prpjeto para depois adicionar o projeto</p>
            <ProjectForm handleSubmit={createPost} btntext="Criar Projeto" />
        </div>
    )
}

export default NewProject