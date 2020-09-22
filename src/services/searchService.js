export const searchService = {
    searchRecipes,
    searchIngredients
}

function searchRecipes(recipes, searchTerm) {
    return recipes.filter(recipe => {
        const test = new RegExp(searchTerm, 'i');
        return recipe.name.toLowerCase().match(test) || recipe.abstract.toLowerCase().match(test)
    });
}

function searchIngredients(recipes, searchTerm) {
    return recipes.filter((recipe) => {
        const test = new RegExp(searchTerm, 'i');
        return recipe.ingredients.filter(ingredient => ingredient.name.match(test)).length > 0;
    })
}