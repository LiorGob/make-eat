
const initialState = {
   searchedRecipes: [],
   searchTerm: ''
}

export function searchReducer(state = initialState, action={}) {
    switch (action.type) {
        case 'SEARCH_RECIPES':
        case 'SEARCH_INGREDIENTS':
            return { ...state, searchedRecipes: action.searchedRecipes, searchTerm: action.searchTerm}
        default:
            return state;

    }
}