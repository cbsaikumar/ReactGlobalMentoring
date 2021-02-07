import { BrowserRouter } from 'react-router-dom';
import Content from '../../components/Content';
import NotFound404Page from '../../components/404NotFoundPage';
import React from 'react'
import { mount } from 'enzyme'
import { useSelector } from 'react-redux';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch
}));

function setup() {
    useSelector.mockImplementation((selectorFn) => selectorFn({
        search: {
            searchby: 'title',
            phrase: '',
        },
        sortby: 'date',
        movies: {
            data: [],
            status: null,
            selectedMovie: null,
            isLoading: false,
            mode: 'none',
        },
    }));
    const wrapper = mount(<BrowserRouter>
        <Content />
    </BrowserRouter>);
    return { wrapper };
}
describe('Content component', () => {
    it('Should render content component', () => {
        const { wrapper } = setup();
        expect(wrapper.find('.my-modal').exists()).toBe(true);
    })
})
