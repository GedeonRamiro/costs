import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import Container from '../../components/Container/'
import ServiceCard from '../../components/ServiceCard/'
import Loading from '../../layout/Loading/'
import Message from '../../layout/Message/'
import ProjectForm from '../ProjectForm/'
import ServiceForm from '../ServiceForm'
import styles from './style.module.css'
import { parse, v4 as uuidv4 } from 'uuid'


const Project = () => {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(true)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    console.log(message)

    const geProject = async () => {
        try {
            const response = await fetch(`http://localhost:5000/projects/${id}`)
            const data = await response.json()
            setProject(data)
            setServices(data.services)
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
                return false
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
        

        const newCost = services.map(service => Number(service.cost))
        .reduce((acc, value) => acc + value, 0)
       

        if(newCost > parseFloat(project.budget)){
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('erro')
            project.services.pop()
            return false
        }

        project.cost = newCost
     
        try {
            await fetch(`http://localhost:5000/projects/${project.id}`, {
                method: 'PATCH',
                body: JSON.stringify(project),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
               
            setShowServiceForm(false)
            setMessage('Serviço criado com sucesso!')
            setType('sucess')

        } catch (error) {
            console.log({ error })   
        }
    }


    
    const removeService = async (id, cost) => {
        setMessage('')
        const serviceUpdate = project.services.filter(service => service.id !== id)
        
        const projectUpdate = project
        
        projectUpdate.services = serviceUpdate
        projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost)
        
        try {
           await fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
                method: 'PATCH',
                body: JSON.stringify(projectUpdate),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            setProject(projectUpdate)
            setServices(serviceUpdate)
            setMessage('Serviço removido com sucesso!')
            setType('sucess')
            
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
    }, [])


    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass='column'>
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            {showProjectForm && <h1>Projeto: {project.name}</h1>}
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
                        {services.length ? services.map(service => (
                          <ServiceCard 
                            id={service.id}
                            name={service.name}
                            cost={service.cost}
                            description={service.description}
                            key={service.id}
                            handleRemove={removeService}
                           />
                        )):
                            <p>Não há serviço cadastrodos!</p>
                        }
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