const initialState = {
    produces: [],
    filterBy: ''
}

export function produceReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'GET_PRODUCES':
            return { ...state, produces: action.produces }
        case 'GET_PRODUCE':
            return { ...state, produce: action.produce }
        case 'SET_FILTER':
            return { ...state, filterBy: action.filterBy }
        default:
            return state
    }
}

