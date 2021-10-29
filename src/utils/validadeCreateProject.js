

const validadeCreateProject = (name, budget, category ) => {

    if(
        category?.name === undefined ||
        category?.name === 'Selecione um opção' ||
        name === '' || 
        budget === '' || 
        name === undefined || 
        budget === undefined){
        return 'Preencha todos os campos!'
    }

    return true
}

export default validadeCreateProject