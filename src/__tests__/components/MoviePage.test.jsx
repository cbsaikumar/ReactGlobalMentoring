import { mount, shallow } from 'enzyme'
import { useDispatch, useSelector } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import CONSTANTS from '../../constants/constants';
import MoviePage from '../../components/MoviePage';
import React from 'react'

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch
}));

const movies = { movies: [CONSTANTS.SAMPLE_MOVIE, CONSTANTS.SAMPLE_MOVIE] };

function setup() {
    useSelector.mockImplementation((selectorFn) => selectorFn({
        search: {
            searchby: 'title',
            phrase: '',
        },
        movies: {
            data: movies,
            status: null,
            selectedMovie: CONSTANTS.SAMPLE_MOVIE,
            isLoading: false,
            mode: 'add',
        }
    }));
    const wrapper = mount(<BrowserRouter><MoviePage movies={movies} /></BrowserRouter>);
    return { wrapper };
}

describe('MoviePage component', () => {
    it('Should render MoviePage component', () => {
        const { wrapper } = setup();
        expect(wrapper.find('.my-modal').exists()).toBe(true);
    })
})
