import {createStore, combineReducers, applyMiddleware} from 'redux';
import {authReducer} from './reducers';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({authReducer});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
