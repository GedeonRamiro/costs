import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import Container from '../../components/Container/'
import Loading from '../../layout/Loading/'
import Message from '../../layout/Message/'
import ProjectForm from '../ProjectForm/'
import ServiceForm from '../ServiceForm'
import styles from './style.module.css'
import { parse, v4 as uuidv4 } from 'uuid'




const Project = () => {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(true)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    const geProject = async () => {
        try {
            const response = await fetch(`http://localhost:5000/projects/${id}`)
            const data = await response.json()
            setProject(data)
            setMessage()
        } catch (error) {
            console.log({ error })
        }
    }

    const editProject = async (project) => {
        setMessage('')
        try {
            const response = await fetch(`http://localhost:5000/projects/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(project),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()

            if (project.budget < project.cost) {
                setMessage('O orçamento não poder ser maios que o orçamento do projeto!')
                setType('erro')
                return
            }

            setProject(data)
            setShowProjectForm(!showProjectForm)
            setMessage('Projeto atualizado!')
            setType('sucess')

        } catch (error) {
            console.log({ error })
        }

    }

    const createService = async () => {

        setMessage('')
        
        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()
        
        const lastServiceCost =  lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.budget)){
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('erro')
            project.services.pop()
            return false
        }

        try {
            await fetch(`http://localhost:5000/projects/${project.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application-json'
                },
                body: JSON.stringify(project)
            })   

            console.log(project)


        } catch (error) {
            console.log({ error })   
        }
    }


    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    useEffect(() => {
        geProject()
    }, [id])


    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass='column'>
                        {message && <Message type={type} msg={message} />}
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
                                <div className={styles.project_info}>
                                    <ProjectForm
                                        btntext='concluir edição'
                                        handleSubmit={editProject}
                                        projectData={project}
                                    >

                                    </ProjectForm>
                                </div>
                            )}
                        </div>

                        <div className={styles.service_form_container}>
                            <h2> Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm} >
                                {showServiceForm ? 'Fechar' : 'Adicionar serviço'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                   <ServiceForm
                                        handleSubmit={createService}
                                        btnText='Adicionar serviço'
                                        projectData={project}

                                   />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass='start'>
                            <p>Itens de Serviços</p>
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}

        </>
    )
}

export default Project