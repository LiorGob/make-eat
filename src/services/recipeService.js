import httpService from './httpService'

export const recipeService = {
    query,
    getById,
    save,
    remove,
    getRatingAvg
}

function query(filterBy) {
    if (filterBy) var queryStr = `?${JSON.stringify(filterBy)}`;
    return httpService.get(`recipe${queryStr || ''}`);
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
        return httpService.post('recipe', recipe)
    }
}

function getRatingAvg(recipe) {
    if (!recipe.reviews) return 'no reviews yet'
    else {
        let ratingAvg = recipe.reviews.reduce((acc, a) => acc + a.rating, 0) / recipe.reviews.length
        return ratingAvg
    }
}