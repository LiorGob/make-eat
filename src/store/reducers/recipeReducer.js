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
            return { ...state, recipe: action.recipe}
        default:
            return state;
    }
}