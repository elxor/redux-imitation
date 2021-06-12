import { INCREMENT, DECREMENT, CHANGE_THEME, FETCH_POSTS, ENABLE_BUTTONS, DISABLE_BUTTONS } from './actionTypes';

export function increment() {
    return {
        type: INCREMENT
    }
}

export function decrement() {
    return {
        type: DECREMENT
    }
}

export function changeTheme(newTheme) {
    return {
        type: CHANGE_THEME,
        payload: newTheme
    }
}

export function fetchPosts() {
    return async dispatch => {
        dispatch(disableButtons());

        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');

        const result = await response.json();

        dispatch({
            type: FETCH_POSTS,
            payload: result
        });
        dispatch(enableButtons());
    }
}

function enableButtons() {
    return {
        type: ENABLE_BUTTONS
    }
}

function disableButtons() {
    return {
        type: DISABLE_BUTTONS
    }
}