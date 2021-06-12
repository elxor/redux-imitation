import { combineReducers } from './redux';
import { counterReducer, themeReducer, fetchPostsReducer, latestActionReducer } from './reducers'; 

export const rootReducer = combineReducers([
    counterReducer, themeReducer, fetchPostsReducer, latestActionReducer
]);