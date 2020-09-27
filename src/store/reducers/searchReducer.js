const initialState = _getInitialState();

function _getInitialState() {
    return {
        searchedRecipes: [],
        recipeSearchTerm: '',
        ingredientSearchTerm: '',
        tagSearch: '',
        searchReady: false
    }
}

export function searchReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SEARCH_TAG':
            return {
                ...state,
                searchedRecipes: action.searchedRecipes,
                tagSearch: action.searchTerm
            }
        case 'SEARCH_RECIPES':
            return {
                ...state,
                searchedRecipes: action.searchedRecipes,
                recipeSearchTerm: action.searchTerm,
                searchReady: true
            }
        case 'SEARCH_INGREDIENTS':
            return {
                ...state,
                searchedRecipes: action.searchedRecipes,
                ingredientSearchTerm: action.searchTerm,
                searchReady: true
            }
        case 'SEARCH_RECIPE_RESET':
            return {
                ...state,
                recipeSearchTerm: '',
                searchReady: false
            };
        case 'SEARCH_INGREDIENT_RESET':
            return {
                ...state,
                ingredientSearchTerm: '',
                searchReady: false
            };
        case 'SEARCH_RESET':
            return {
                ...state,
                recipeSearchTerm: '',
                ingredientSearchTerm: '',
                searchReady: false
            };
        default:
            return state;

    }
}