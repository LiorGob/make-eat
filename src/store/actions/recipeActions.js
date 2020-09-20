import {recipeService} from '../../services/recipeService'

export function loadRecipes(filterBy) {
    return async dispatch => {
        try {
            const recipes = await recipeService.query(filterBy);
            dispatch({ type: 'SET_RECIPES', recipes })
        }
        catch (err) {
            console.log('RecipeActions: error in loadRecipes', err);
        }
    };
}

export function getRecipe(id) {
    return async dispatch => {
        try{
            const recipe = await recipeService.getById(id);
            dispatch({ type: 'GET_RECIPE', recipe })
        }
        catch(err){
            console.log('RecipeActions: error in getRecipe(id)');
        }
    }
}

export function removeRecipe(id) {
    return async dispatch => {
        try {
            await recipeService.remove(id)
            dispatch({ type: 'REMOVE_RECIPE', id })
        }
        catch (err) {
            console.log('RecipeActions: error in removeRecipe', err);
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
            console.log('RecipeAction: error in add or update recipe', err);
        }
    };
}


export function addToFavorites(recipe, user){
    return async dispatch => {
        if (recipe.likers.find((liker)=>liker._id === user._id)){
            dispatch({ type: 'NOTIFY', msg: { type: 'warning', txt: 'This recipe is already to your Favorites' } });    
            return;
        }
        var minUser = {_id: user._id, fullName: user.fullName, imgUrl: user.imgUrl};
        var likersUpdated = [...recipe.likers];
        likersUpdated.push(minUser);
        var recipeToUpdate = { ...recipe, likers: likersUpdated};
        console.log('recipeToUpdate', recipeToUpdate);
        const recipeU = await recipeService.save(recipeToUpdate);
        dispatch({ type: 'ADD_FAVORITE', recipeU })
        dispatch({type: 'NOTIFY', msg: {type: 'success', txt: 'Congrats! The recipe was added to your Favorites', icon: 'favorites'}});
    }
}