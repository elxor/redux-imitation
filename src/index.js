import { createStore, applyMiddleware } from './redux/redux';
import { rootReducer } from './redux/rootReducer';
import { increment, decrement, changeTheme, fetchPosts } from './redux/actions';
import { thunkMiddleware } from './redux/thunk';
import { loggerMiddleware } from './redux/logger';
import './styles/main.css';

const counter = document.querySelector('#counter');
const addBtn = document.querySelector('.add');
const subBtn = document.querySelector('.sub');
const themeBtn = document.querySelector('.change-theme');
const fetchBtn = document.querySelector('.fetch');
const posts = document.querySelector('.posts');

const store = createStore(
    rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware)
);

addBtn.addEventListener('click', () => {
    store.dispatch(increment());
});

subBtn.addEventListener('click', () => {
    store.dispatch(decrement());
});

themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light')
        ? 'dark'
        : 'light';

    store.dispatch(changeTheme(newTheme));
});

fetchBtn.addEventListener('click', () => {
    store.dispatch(fetchPosts());
});


store.subscribe(() => {
    const state = store.getState();

    switch (state.latestAction) {
        case 'counter':
            counter.textContent = state.counter;
            break;
        case 'changeTheme':
            document.body.className = state.theme;
            break;
        case 'fetchPosts':
            postsToPage(state.posts);
            break;
        case 'buttonAction':
            fetchBtn.disabled = state.disabled;
            break;
        default: return;
    }
});


function postsToPage(postsArray) {
    if (postsArray !== '') {

        while (posts.firstChild)  posts.removeChild(posts.firstChild);

        const elems = postsArray.map(post => {
            return `<p class="post-item">
                ${post.title}
            </p>`
        }).join('');

        posts.innerHTML = elems;
    }
}