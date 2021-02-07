import App from '../App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import initialState from '../store/reducers/initialState';
import reducer from '../store/reducers/index';

describe('App component', () => {
    const mockStore = createStore(reducer, initialState);
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={mockStore}><App /></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
})