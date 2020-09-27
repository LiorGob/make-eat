import httpService from './httpService';
import { utilService } from './utilService';

export const recipeService = {
    query,
    getById,
    save,
    remove,
    getRatingAvg,
    getReviewsNum
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

// function getReview(recipe, user) {
//     return recipe.reviews.map(review => {
//         review.by._id === user._id 

//     })
// }

function getReviewsNum(id) {
    if (!sessionStorage.getItem("recipe-" + id)) {
        sessionStorage.setItem("recipe-" + id, (utilService.getRandomInt(1,10)) * 50)
    }
    return sessionStorage.getItem("recipe-" + id)
}


