export const createStore = (reducer, middleware) => {
    let state;
    const subscribers = [];

    const coreDispatch = action => {
        state = reducer(state, action);
        subscribers.forEach(sub => sub());
    }

    const getState = () => state;

    const store = {
        dispatch: coreDispatch,
        getState,
        subscribe: callback => {
            subscribers.push(callback);
        }
    }

    if (middleware) {
        const dispatch = action => store.dispatch(action);

        store.dispatch = middleware({
            dispatch,
            getState
        })(coreDispatch);
    }

    coreDispatch({type: '__INIT__'});

    return store;
}

export const applyMiddleware = (...middlewares) => store => {
    if (middlewares.length === 0) {
        return dispatch => dispatch;
    }
    if (middlewares.length === 1) {
        return middlewares[0](store);
    }

    const boundMiddlewares = middlewares.map(middleware =>
        middleware(store)
    );
    return boundMiddlewares.reduce((a, b) =>
        next => a(b(next))
    );
}

export const combineReducers = reducers => {
    const nextState = {}

    return (state, action) => {
        reducers.forEach(reducer => {
            const value = reducer(state, action);
            for (let key in value) {
                nextState[key] = value[key];
            }
        });

        return nextState;
    }
}