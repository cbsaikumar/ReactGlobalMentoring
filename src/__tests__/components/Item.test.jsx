import { BrowserRouter } from 'react-router-dom';
import Item from '../../components/Item';
import React from 'react';
import { mount } from 'enzyme';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useDispatch: () => mockDispatch
}));

function setup() {
    const movie = {
        id: 123,
        poster_path: 'http://www.google.com',
        overview: 'No overview',
        title: 'Avengers',
        release_date: "2016-12-29",
        genres: ['drama', 'action']
    };

    const wrapper = mount(<BrowserRouter><Item movie={movie} /></BrowserRouter>);
    return { wrapper };
}

describe('Item component', () => {
    it('Should render Item component', () => {
        const { wrapper } = setup();
        expect(wrapper.find('.movie-card').length).toEqual(1);
        wrapper.find('.thumbnails').simulate('click');
    })
});