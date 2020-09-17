import {recipeService} from '../../services/recipeService'

export function loadRecipes() {
    return async dispatch => {
        try {
            const recipes = await recipeService.query();
            dispatch({ type: 'SET_RECIPES', recipes })
        }
        catch (err) {
            console.log('RecipeAction:err in loadRecipes', err);
        }
    };
}


export function getRecipe(id) {
    return async dispatch => {
        const recipe = await recipeService.getById(id)
        dispatch({ type: 'GET_RECIPE', recipe })
    }
}