import { mount, shallow } from 'enzyme'
import { useDispatch, useSelector } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import CONSTANTS from '../../constants/constants';
import Menu from '../../components/Menu';
import React from 'react'

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch
}));

const movie = { movie: CONSTANTS.SAMPLE_MOVIE };

function setup() {
    useSelector.mockImplementation((selectorFn) => selectorFn({
        search: {
            searchby: 'title',
            phrase: '',
        },
        movies: {
            data: [],
            status: null,
            selectedMovie: CONSTANTS.SAMPLE_MOVIE,
            isLoading: false,
            mode: 'add',
        }
    }));
    const wrapper = mount(<BrowserRouter><Menu movie={movie} /></BrowserRouter>);
    return { wrapper };
}

describe('Menu component', () => {
    it('Should render Menu component', async () => {
        const { wrapper } = setup();
        expect(wrapper.find('NavLink').exists()).toBe(true);
        wrapper.find('NavDropdown').children().at(0).simulate('click')
        wrapper.find('.dropdown-toggle').at(0).simulate('click')
        wrapper.find('.dropdown-item').at(0).simulate('click');
        wrapper.find('.dropdown-item').at(1).simulate('click');
        wrapper.find('.dropdown-item').at(2).simulate('click');
        wrapper.find('.dropdown-item').at(3).simulate('click');
    })
})
