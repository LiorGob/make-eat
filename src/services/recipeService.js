import httpService from './httpService'


export const recipeService={
    query,
    getRecipes,
    getById,
    save,
    remove

}


function query(filterBy) {
    if (filterBy) var queryStr = `?name=${filterBy.name}&sort=anaAref`;
    return httpService.get(`recipe${queryStr || ''}`);
}

function getRecipes() {
    return httpService.get('recipe')
}

function getById(recipeId) {
    return httpService.get(`recipe/${recipeId}`)
}

function remove(recipeId) {
    return httpService.delete(`recipe/${recipeId}`)
}

async function save(recipe) {
    if (recipe._id) {
        return httpService.put(`recipe/${recipe._id}`, recipe)
    }
    else {
        return  httpService.post('recipe', recipe)
    }
}
