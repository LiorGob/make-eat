
const initialState = {
   filteredRecipes: [],
    
  
}

export function filteredRecipeReducer(state = initialState, action={}) {
    console.log(action)
    switch (action.type) {
        case 'SET_FILTERED_RECIPES':
            return { ...state, filteredRecipes: action.filteredRecipes}
        case 'GET_FILTERED_RECIPES':
            return { ...state, filteredRecipes: action.filteredRecipes }
      
        default:
            return state;

    }
}