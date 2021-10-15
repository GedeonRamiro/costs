import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react"


const Project = () => {
    
    const { id } = useParams()
    const [project, setProject] = useState([])

    console.log(project)

    const geProject = async () => {
        try {
            const response = await fetch(`http://localhost:5000/projects/${id}`)
            const data = await response.json()
            setProject(data)
        } catch (error) {
            console.log({error})
        }
    } 

    useEffect(() => {
        geProject()
    }, [id])

    return(
        <p>{project.name}</p>
    )
}

export default Project