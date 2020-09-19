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

export function removeRecipe(id) {
    return async dispatch => {
        try {
            await recipeService.remove(id)
            dispatch({ type: 'REMOVE_RECIPE', id })
        }
        catch (err) {
            console.log('RecipeAction: err in removeRecipe', err);
        }
    };
}

export function saveRecipe(recipe) {
    return async dispatch => {
        try {
            if (recipe._id) {
                const editRecipe = await recipeService.save(recipe)
                console.log('editRecipe:', editRecipe, 'recipe:', recipe);
                dispatch({ type: 'EDIT_RECIPE', recipe: editRecipe })
            }
            else {
                recipe = await  recipeService.save(recipe)
                dispatch({ type: 'ADD_RECIPE', recipe })
            }
            return Promise.resolve(recipe)
        }
        catch (err) {
            console.log('RecipeAction:err in add or update recipe', err);
        }
    };
}


export function addToFavorites(recipe, userId){
    return async dispatch => {
        if (recipe.likers.find((liker)=>liker._id === userId)){
            dispatch({ type: 'NOTIFY', msg: { type: 'warning', txt: 'This recipe is already to your Favorites' } });    
            return;
        }
        //var recipeToUpdate = {...recipe, likers: recipe.likers.push(userId)};

        //const recipe = await recipeService.save(recipeToUpdate, userId);
        //dispatch({ type: 'ADD_FAVORITE', recipe })
        dispatch({type: 'NOTIFY', msg: {type: 'success', txt: 'Congratulations! The recipe was added to your Favorites'}});
    }
}