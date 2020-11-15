import { mount, shallow } from 'enzyme'
import { useDispatch, useSelector } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import CONSTANTS from '../../constants/constants';
import React from 'react'
import SearchPage from '../../components/SearchPage';

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

function setup(searchData) {
    useSelector.mockImplementation((selectorFn) => selectorFn({
        search: {
            searchby: 'title',
            phrase: '',
        },
        movies: {
            data: [CONSTANTS.SAMPLE_MOVIE, CONSTANTS.SAMPLE_MOVIE],
            status: null,
            selectedMovie: CONSTANTS.SAMPLE_MOVIE,
            isLoading: false,
            mode: 'add',
        }
    }));
    const wrapper = mount(<BrowserRouter><SearchPage {...searchData} /></BrowserRouter>);
    return { wrapper };
}

describe('SearchPage component', () => {
    it('Should Search Page component', () => {
        const { wrapper } = setup(searchData);
        expect(wrapper.find('.my-modal').exists()).toBe(true);
    })

    it('Should Search Page component', () => {
        const { wrapper } = setup();
        expect(wrapper.find('.my-modal').exists()).toBe(true);
    })
    // it('Should Search Page component', () => {
    //     const { wrapper } = setup();
    //     expect(wrapper.find('.header input').exists()).toBe(true);
    //     wrapper.find('.header input').simulate('change')
    //     wrapper.find('.header input').simulate('keydown')
    //     wrapper.find('.header .search-phrase-section #title').simulate('click')
    //     wrapper.find('.header .search-phrase-section #genre').simulate('click')
    // })
})
