import { utilService } from './utilService';

export const searchService = {
    searchRecipes,
    searchIngredients,
    searchTag
}

function searchRecipes(recipes, searchTerm) {
    const recipiesCopy = utilService.deepClone(recipes);
    return recipiesCopy.filter(recipe => {
        const test = new RegExp(getSingular(searchTerm), 'i');
        return recipe.name.toLowerCase().match(test) || recipe.abstract.toLowerCase().match(test)
    });
}

function searchIngredients(recipes, searchTerm) {
    const recipiesCopy = utilService.deepClone(recipes);
    return recipiesCopy.filter((recipe) => {
        const test = new RegExp(getSingular(searchTerm), 'i');
        return recipe.ingredients.filter(ingredient => ingredient.name.match(test)).length > 0;
    })
}

function searchTag(recipes, searchTag) {
    const recipiesCopy = utilService.deepClone(recipes);
    return recipiesCopy.filter(recipe => {
        const test = new RegExp(getSingular(searchTag), 'i');
        return recipe.tags.filter(tag => tag.match(test)).length > 0;
    })
}
function getSingular(word) {
    //^(.*).$
    return word.charAt(word.length - 1) === 's' ? word.substring(0, word.length - 1) : word;
}