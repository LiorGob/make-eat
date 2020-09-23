
const initialState = _getInitialState();

function _getInitialState(){
    return {
        searchedRecipes: [],
        recipeSearchTerm: '',
        lastRecipeSearchTerm: '',
        searchInRecipes: false,
        ingredientSearchTerm: '',
        lastIngredientSearchTerm: '',
        searchInIngredients: false,
        searchReady: false
    }
}

export function searchReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SEARCH_RECIPES':
            return { 
                ...state, 
                searchedRecipes: action.searchedRecipes, 
                recipeSearchTerm: action.searchTerm, 
                searchReady: true, 
                lastRecipeSearchTerm: '' 
            }
        case 'SEARCH_INGREDIENTS':
            return { 
                ...state, 
                searchedRecipes: action.searchedRecipes, 
                ingredientSearchTerm: action.searchTerm, 
                searchReady: true, 
                lastIngredientSearchTerm: ''
            }
        case 'SEARCH_RECIPE_RESET':
            return {
                ...state,
                lastRecipeSearchTerm: state.recipeSearchTerm,
                recipeSearchTerm: '',
                searchReady: false,
                searchInIngredients: true,
                searchInRecipes: false
            };
        case 'SEARCH_INGREDIENT_RESET':
            return {
                ...state,
                lastIngredientSearchTerm: state.ingredientSearchTerm,
                ingredientSearchTerm: '',
                searchReady: false,
                searchInRecipes: true,
                searchInIngredients: false
            };
        case 'SEARCH_RESET':
            return {
                ...state,
                lastRecipeSearchTerm: state.recipeSearchTerm,
                recipeSearchTerm: '',
                lastIngredientSearchTerm: state.ingredientSearchTerm,
                ingredientSearchTerm: '',
                searchReady: false,
                searchInRecipes: false,
                searchInIngredients: false
            };
        default:
            return state;

    }
}