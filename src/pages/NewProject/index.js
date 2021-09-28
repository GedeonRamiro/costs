import styles from './style.module.css'
import ProjectForm from '../ProjectForm/'
import { useHistory } from 'react-router'


const NewProject = () => {

    const history = useHistory()

    const getProject = async (project) => {

        await fetch('http://localhost:5000/projects', {
            method: 'POST',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            history.push('/project', {message: 'Projeto criado com sucesso!'})
        })
        .catch(err => console.log(err))
    }

    const createPost = (project) => {
        project.cost = 0
        project.services = []
        getProject(project)
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