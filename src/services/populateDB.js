import httpService from './httpService';
import data from '../assets/data/db.json';

var usersMap = {};
var produceMap = {};

export const populateDBService = {
    populateUsers,
    populateProduce,
    populateRecipe
}

async function populateUsers() {
    data.user.map(user => {
        var newUser = {...user};
        newUser.password = '111';
        newUser.isAdmin = false;
        return createDocumentMap(newUser, 'user', usersMap)
    });
}

async function populateProduce() {
    var map = {};
    data.produce.map(produce => {
        var price = produce.price; 
        produce = { ...produce, price: price.toString()};
        return createDocumentMap(produce, 'produce', produceMap);
    });
}

async function createDocumentMap(item, path, map) {
    var newItem = { ...item };
    delete newItem._id;
    var insertedItem = await httpService.post(path, newItem);
    map[item._id] = insertedItem._id;
    return newItem;
}

function populateRecipe(){
    data.recipe.map(recipe => {
        recipe.createdBy._id = usersMap[recipe.createdBy._id];
        recipe.makers.map(maker => updateId(maker, usersMap));
        recipe.likers.map(liker => updateId(liker, usersMap));    
        recipe.reviews.map(review => updateId(review.by, usersMap));
        recipe.ingredients.map(ingredient => ingredient.produceId = produceMap[ingredient.produceId]);
        var newRecipe = { ...recipe };
        delete newRecipe._id;
        return httpService.post('recipe', newRecipe);
    });    
}    

function updateId(user, userMap){
    user._id = userMap[user._id];
}    