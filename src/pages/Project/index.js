import { useState, useEffect } from 'react'
import Message from '../../layout/Message/'
import { useLocation } from 'react-router'
import Container from '../../components/Container/'
import LinkButton from '../../components/LinkButton/'
import style from './style.module.css'
import CardProject from '../../components/CardProject/'
import Loading from '../../layout/Loading/'


const Project = () => {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [messageDelete, setMessageDelete] = useState('')
  

    const location = useLocation()
    let message = ''
  
    if(location.state){
        message = location.state.message
    }

    const getProjects = async () => {
        try {
            const response = await fetch('http://localhost:5000/projects')
            const data = await response.json()
            setProjects(data)
            setRemoveLoading(true)
        } catch (error) {
            console.log(error)
        }
    }
    
     const deleteProject = async (id) => {
        try {
            await fetch(`http://localhost:5000/projects/${id}`, {
                method: 'DELETE',
                body: JSON.stringify(projects),
                headers: {
                    'Content-Type': 'application/json'
                }
            })                    
            setProjects(projects.filter(project => project.id !== id))
            setMessageDelete('Projeto removido com sucesso!')
        } catch (error) {
            console.log(error)
            console.log('Deletar projeto deu errado!')    
        }
    } 

    useEffect(() => {
        getProjects()
    }, [])

    return (
        <div className={style.project_container}>
            <div className={style.title_container}>
                <h1>Meu Projetos</h1>
              
                <LinkButton to="newproject" text="Criar Projeto"  />
            </div>    
                {message && (
                     <Message msg={message} type="sucess"/>
                )}
                 {messageDelete && (
                     <Message msg={messageDelete} type="sucess"/>
                )}
                <Container customClass="start">
                    {projects.length > 0 && 
                        projects.map(project => (
                            <CardProject
                               key={project.id}
                               id={project.id}
                               name={project.name}
                               budget={project.budget}
                               category={project.category} 
                               handleRemove={deleteProject} 
                            />
                        ))
                    }

                    {!removeLoading && <Loading />}
                    {removeLoading && projects.length === 0 && (
                        <p>Não há projetos cadastrados!</p>
                    )}
                </Container>
        </div>
    )
}

export default Project
