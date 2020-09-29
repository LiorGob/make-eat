import httpService from './httpService';
import { utilService } from './utilService';

export const recipeService = {
    query,
    getById,
    save,
    remove,
    getRatingAvg,
    getReviewsNum,
    getMadeByLabel,
    updateRecipeUserList,
    markAsMade
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
        return ratingAvg.toFixed(1);
    }
}

// function getReview(recipe, user) {
//     return recipe.reviews.map(review => {
//         review.by._id === user._id 

//     })
// }

function getReviewsNum(id) {
    const sessionItem = `recipe-${id}-reviews-num`;
    if (!sessionStorage.getItem(sessionItem)) {
        sessionStorage.setItem(sessionItem, (utilService.getRandomInt(1,10)) * 50)
    }
    return sessionStorage.getItem(sessionItem);
}

function getMadeIt(id){
    const reviews = getReviewsNum(id);
    const sessionItem = `recipe-${id}-madeit-num`;
    if (!sessionStorage.getItem(sessionItem)) {
        sessionStorage.setItem(sessionItem, utilService.getRandomInt(reviews / 2, reviews));
    }
    return sessionStorage.getItem(sessionItem);
}

function getMadeByLabel(id) {
    const madeBy = getMadeIt(id);
    return madeBy ? `${madeBy} made it` : '';
}

function markAsMade(recipe, user) {
    console.log('recipe3', recipe);
    if (recipe.makers.find((maker) => maker._id === user._id)) {
        return recipe;
    }
    var recipeToUpdate = { ...recipe, makers: updateRecipeUserList(recipe.makers, user) };
    console.log('recipeToUpdate', recipeToUpdate);
    return recipeToUpdate;
}

function updateRecipeUserList(list, user) {
    var minUser = { _id: user._id, fullName: user.fullName, imgUrl: user.imgUrl };
    var updatedList = [...list];
    updatedList.push(minUser);
    return updatedList;
}

