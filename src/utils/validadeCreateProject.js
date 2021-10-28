
const validadeCreateProject = (name, budget ) => {
    if(
        name === '' || 
        budget === '' || 
        name === undefined || 
        budget === undefined){
        return 'Preencha todos os campos!'
    }

    return true
}

export default validadeCreateProject