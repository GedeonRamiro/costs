import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react"
import Loading from '../../layout/Loading/'
import Container from '../../components/Container/'
import styles from './style.module.css'


const Project = () => {
    
    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(true)

    const geProject = async () => {
        try {
            const response = await fetch(`http://localhost:5000/projects/${id}`)
            const data = await response.json()
            setProject(data)
        } catch (error) {
            console.log({error})
        }
    } 

    function toggleProjectForm (){
        setShowProjectForm(!showProjectForm)
    }
    
    useEffect(() => {
        geProject()
    }, [id])

    return(
    <>
        {project.name ? (
            <div className={styles.project_details}>
                <Container customClass='column'>
                    <div className={styles.details_container}>
                      <h1>Projeto: {project.name}</h1>      
                       <button className={styles.btn} onClick={toggleProjectForm} >
                            {showProjectForm ? 'Editar projeto' : 'Fechar'}       
                        </button>
                        {showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                    <span>Categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total Orçamento:</span> R$ {project.budget}
                                </p>
                                <p>
                                    <span>Total utilizado:</span> R$ {project.cost}
                                </p>
                            </div>
                        ) : (
                            <div  className={styles.project_info}>
                                project form
                            </div>
                        )}
                    </div>
                </Container>  
 
            </div>
        ) : (
            <Loading />
        )}
    
    </> 
    )
}

export default Project