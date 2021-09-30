import { useState, useEffect } from 'react'
import Message from '../../layout/Message/'
import { useLocation } from 'react-router'
import Container from '../../components/Container/'
import LinkButton from '../../components/LinkButton/'
import style from './style.module.css'
import CardProject from '../../components/CardProject/'

const Project = () => {

    const [projects, setProjects] = useState([])

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
        } catch (error) {
            console.log(error)
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
                <Container customClass="start">
                    {projects.length > 0 && 
                        projects.map(project => (
                            <CardProject
                               key={project.id}
                               id={project.id}
                               name={project.name}
                               budget={project.budget}
                               category={project.category} 
                            />
                        ))
                    }
                </Container>
        </div>
    )
}

export default Project
