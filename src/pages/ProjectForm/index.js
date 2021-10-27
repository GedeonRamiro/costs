import styles from './style.module.css';
import Input from '../../components/Form/Input/'
import Select from '../../components/Form/Select/'
import SubmitButton from '../../components/Form/SubmitButton/'
import { useState, useEffect } from 'react';
import validadeCreateProject from '../../utils/validadeCreateProject'

const ProjectForm = ({ handleSubmit, btntext, projectData }) => {
    
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})
    console.log(project)
    console.log(validadeCreateProject)
    
    const getCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/categories')

        const data = await response.json()

        return setCategories(data)
      } catch (error) {
          console.error(error)
          console.error("Algo deu errado!")
      }
    }

    useEffect(() => {
        getCategories()
    }, [])

    const submit = e => {
        e.preventDefault()
        handleSubmit(project)
    }

    const handleChange = e => {
        setProject({  ...project, [e.target.name]: e.target.value })
    }

    const handleCategory= e => {
        setProject({  ...project, 
            category:{
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text
            },
     })
    }


    return (
        
        <form onSubmit={submit} className={styles.form}>
            <Input  
                type="text"
                text= "Nome do projeto" 
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />
              <Input  
                type="number"
                text= "Orçamento do projeto" 
                name="budget"
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            <Select
                name="category_id" 
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />
            <SubmitButton text={btntext} />
        </form>
    )
}

export default ProjectForm