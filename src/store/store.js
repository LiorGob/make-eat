import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {userReducer} from './reducers/userReducer';
import {recipeReducer} from './reducers/recipeReducer';

const rootReducer= combineReducers({
    userReducer,
    recipeReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
