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

export function addToFavorites(recipe, user){
    console.log('add to favs:',recipe);
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