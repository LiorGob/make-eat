const initialState = {
    recipes: [],
    reviews: [],
    recipe: ''
}

export function recipeReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_RECIPES':
            return { ...state, recipes: action.recipes }
        case 'GET_RECIPE':
            return { ...state, recipe: action.recipe }
        case 'REMOVE_RECIPE':
            return { ...state, recipes: state.recipes.filter(recipe => recipe._id !== action.id) }
        case 'ADD_RECIPE':
        case 'ADD_FAVORITE':
        case 'ADD_MADEIT':
        case 'ADD_REVIEW':
            return { ...state, recipes: [action.recipe, ...state.recipes] }
        case 'EDIT_RECIPE':
            return {
                ...state, recipes: state.recipes.map(recipe => {
                    if (recipe._id === action.recipe._id) return action.recipe
                    return recipe
                })
            }
        default:
            return state;
    }
}