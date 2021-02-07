import { mount, shallow } from 'enzyme'
import { useDispatch, useSelector } from 'react-redux';

import AddOrEditMovie from '../../components/AddOrEditMovie';
import { BrowserRouter } from 'react-router-dom';
import CONSTANTS from '../../constants/constants';
import MovieDetails from '../../components/MovieDetails';
import React from 'react'

const searchData = {
    match: {
        params: {
            query: 'Avenger'
        }
    },
    location: {}
};

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch
}));

function setup(isMovieSelected, searchData) {
    useSelector.mockImplementation((selectorFn) => selectorFn({
        movies: {
            data: [],
            status: null,
            selectedMovie: isMovieSelected ? CONSTANTS.SAMPLE_MOVIE : null,
            isLoading: false,
            mode: 'add',
        }
    }));
    const wrapper = mount(<BrowserRouter><MovieDetails {...searchData} /> </BrowserRouter>);
    return { wrapper };
}

describe('MovieDetails component', () => {
    it('Should render MovieDetails', () => {
        const { wrapper } = setup(true, searchData);
        expect(wrapper.find('.movie-wrapper').exists()).toBe(true);
        wrapper.find('button').simulate('click');
    });

    it('Should render MovieDetails', () => {
        const { wrapper } = setup(false);
        expect(wrapper.find('.movie-wrapper').exists()).toBe(false);
    });
})
