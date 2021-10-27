
const validadeCreateProject = (name, budget ) => {
    if(name === '' || budget === ''){
        return 'Preencha todos os campos!'
    }

    return true
}

export default validadeCreateProject