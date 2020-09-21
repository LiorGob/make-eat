

export function setFilteredRecipes(filteredRecipes) {
    return dispatch => {

        dispatch({ type: 'SET_FILTERED_RECIPES', filteredRecipes })

    }
}

