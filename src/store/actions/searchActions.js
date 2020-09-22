
import { searchService } from '../../services/searchService';

export function searchRecipes(recipes, searchTerm) {
    return async dispatch => {
        const searchedRecipes = await searchService.searchRecipes(recipes, searchTerm);
        dispatch({ type: 'SEARCH_RECIPES', searchedRecipes, searchTerm });
    }
}

export function searchIngredients(recipes, searchTerm){
    return async dispatch => {
        const searchedRecipes = await searchService.searchIngredients(recipes, searchTerm);
        dispatch({ type: 'SEARCH_INGREDIENTS', searchedRecipes, searchTerm });

    }
}

