import httpService from './httpService';
import data from '../assets/data/db.json';

export const populateDBService = {
    populateUsers,
    populateProduce,
    populateRecipe
}

async function populateUsers() {
    var map = {}
    data.user.map(async (user) => {
        var newUser = {...user};
        newUser.password = '111';
        newUser.isAdmin = false;
        return createDocumentMap(newUser, 'user', 'USERS', map)
    });
}

async function populateProduce() {
    var map = {};
    data.produce.map(produce => {
        var price = produce.price; 
        produce = { ...produce, price: price.toString()};
        return createDocumentMap(produce, 'produce', 'PRODUCES', map);
    });
}

async function createDocumentMap(item, path, key, map) {
    var newItem = { ...item };
    delete newItem._id;
    var insertedItem = await httpService.post(path, newItem);
    map[item._id] = insertedItem._id;
    saveToStorage(key, map);
    return newItem;
}

function populateRecipe(){
    // createdBy._id, makers._id, likers._id, reviews->by._id
    // ingredients.produceId
    const usersMap = loadFromStorage('USERS');
    const produceMap = loadFromStorage('PRODUCES');
    data.recipe.map(async recipe => {
        recipe.createdBy._id = usersMap[recipe.createdBy._id];
        recipe.makers.map(maker => updateId(maker, usersMap));
        recipe.likers.map(liker => updateId(liker, usersMap));    
        recipe.reviews.map(review => updateId(review.by, usersMap));
        recipe.ingredients.map(ingredient => ingredient.produceId = produceMap[ingredient.produceId]);
        var newRecipe = { ...recipe };
        delete newRecipe._id;
        httpService.post('recipe', newRecipe);
    });    
}    

function updateId(user, userMap){
    user._id = userMap[user._id];
}    

function _getStorageKeyName(key) {
    return 'POPULATE_MAKE_EAT_' + key;
}

function saveToStorage(key, val) {
    localStorage.setItem(_getStorageKeyName(key), JSON.stringify(val));
}

function loadFromStorage(key) {
    var val = localStorage.getItem(_getStorageKeyName(key));
    return JSON.parse(val);
}