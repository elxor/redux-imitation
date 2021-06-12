import { INCREMENT, DECREMENT, CHANGE_THEME, FETCH_POSTS, ENABLE_BUTTONS, DISABLE_BUTTONS } from './actionTypes';


const initialCounterState = {
    counter: 0
}

export const counterReducer = (state = initialCounterState , action) => {
    switch (action.type) {
        case INCREMENT:
            return {...state, counter: state.counter + 1}
        case DECREMENT:
            return {...state, counter: state.counter - 1}
        default: return state;
    }
}


const initialThemeState = {
    theme: 'light',
    disabled: false
}

export const themeReducer = (state = initialThemeState, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            return {...state, theme: action.payload}
        case ENABLE_BUTTONS:
            return {...state, disabled: false}
        case DISABLE_BUTTONS:
            return {...state, disabled: true}
        default: return state;
    }
}


const initialPostsState = {
    posts: ''
}

export const fetchPostsReducer = (state = initialPostsState, action) => {
    switch (action.type) {
        case FETCH_POSTS: 
            return {...state, posts: action.payload}
        default: return state;
    }
}


const initialLatestActionState = {
    latestAction: ''
}

export const latestActionReducer = (state = initialLatestActionState, action) => {
    switch (action.type) {
        case INCREMENT:
            return {...state, latestAction: 'counter'}
        case DECREMENT:
            return {...state, latestAction: 'counter'}
        case CHANGE_THEME:
            return {...state, latestAction: 'changeTheme'}
        case FETCH_POSTS:
            return {...state, latestAction: 'fetchPosts'}
        case ENABLE_BUTTONS:
            return {...state, latestAction: 'buttonAction'}
        case DISABLE_BUTTONS:
            return {...state, latestAction: 'buttonAction'}
        default: return state;
    }
}