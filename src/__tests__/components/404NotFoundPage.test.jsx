import { BrowserRouter } from 'react-router-dom';
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
        <NotFound404Page />
    </BrowserRouter>);
    return { wrapper };
}
describe('Not found page component', () => {
    it('Should render not found page content', () => {
        const { wrapper } = setup();
        expect(wrapper.find('.landing-page').exists()).toBe(true);
    })

    it('Should render find button and perform click event', () => {
        const { wrapper } = setup();
        wrapper.find('input').simulate('change');
        wrapper.find('input').simulate('keydown', { keyCode: 13, target: { value: 'Avengers' } });
        wrapper.find('input').simulate('keydown', { keyCode: 12, target: { value: 'Avengers' } });
        wrapper.find('#title').simulate('click');
        wrapper.find('#genre').simulate('click');
    })
})
