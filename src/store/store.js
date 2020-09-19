import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {userReducer} from './reducers/userReducer';
import {recipeReducer} from './reducers/recipeReducer';
import {produceReducer} from './reducers/produceReducer';
import {notificationReducer} from './reducers/notificationReducer';

const rootReducer= combineReducers({
    userReducer,
    recipeReducer,
    produceReducer,
    notificationReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
