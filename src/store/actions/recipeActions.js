import { recipeService } from '../../services/recipeService';
import { socket, socketService } from '../../services/socketService'

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
        try {
            const recipe = await recipeService.getById(id);
            dispatch({ type: 'GET_RECIPE', recipe })
        }
        catch (err) {
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
                recipe = await recipeService.save(recipe)
                dispatch({ type: 'ADD_RECIPE', recipe })
            }
            return Promise.resolve(recipe)
        }
        catch (err) {
            console.log('RecipeAction: error in add or update recipe', err);
        }
    };
}


export function addToFavorites(recipe, user) {
    return async dispatch => {
        if (recipe.likers.find((liker) => liker._id === user._id)) {
            dispatch({ type: 'NOTIFY', msg: { type: 'warning', txt: 'This recipe is already in your Favorites' } });
            return;
        }
        var recipeToUpdate = { ...recipe, likers: recipeService.updateRecipeUserList(recipe.likers, user) };
        console.log('recipeToUpdate', recipeToUpdate);
        const recipeU = await recipeService.save(recipeToUpdate);
        dispatch({ type: 'ADD_FAVORITE', recipe: recipeU })
        dispatch({ type: 'NOTIFY', msg: { type: 'success', txt: 'Congrats! The recipe was added to your Favorites', icon: 'favorites' } });
        //socketService.emit('ADDED TO FAVORITES', {recipe, user});
    }
}

// export function addToMadeIt(recipe, user) {
//     return async dispatch => {
//         if (recipe.makers.find((maker) => maker._id === user._id)) {
//             dispatch({ type: 'NOTIFY', msg: { type: 'warning', txt: 'This recipe is already in your Made It list' } });
//             return;
//         }

//         var recipeToUpdate = { ...recipe, makers: _updateRecipeUserList(recipe.makers, user) };
//         const recipeU = await recipeService.save(recipeToUpdate);
//         dispatch({ type: 'ADD_MADEIT', recipe: recipeU })
//         dispatch({ type: 'NOTIFY', msg: { type: 'success', txt: 'Congrats! The recipe was added to your Made It list', icon: 'favorites' } });
//         socketService.emit('ADDED TO MADE IT', { recipe, user });
//     }
// }


export function addReview(recipe, user) {
     return async dispatch => {
         const recipeToUpdate = await recipeService.save(recipe);
         dispatch({ type: 'ADD_REVIEW', recipe: recipeToUpdate })
         dispatch({ type: 'NOTIFY', msg: { type: 'success', txt: 'Thank you for submitting a review. The recipe was added to your Made It list', icon: 'favorites' } });
         //socketService.emit('ADDED REVIEW', { recipe, user });
     }
}