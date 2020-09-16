const initialState = {
    recipes:[],
    reviews:[]
}

export function recipeReducer(state = initialState, action = {}){
    switch (action.type){
        case 'SET_RECIPES':
            return { ...state, recipes: action.recipes }
        default:
            return state; 
    }
}