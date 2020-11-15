import DeleteMovie from '../../components/DeleteMovie';
import React from 'react';
import { mount } from 'enzyme';
import { useSelector } from 'react-redux';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch
}));

function setup(show, ...rest) {
    useSelector.mockImplementation((selectorFn) => selectorFn({
        movies: {
            data: [],
            status: null,
            selectedMovie: {
                title: 'Avengers',
                id: 1,
            },
            isLoading: false,
            mode: 'delete',
        }
    }));
    const wrapper = mount(<DeleteMovie show={show} {...rest} />);
    return { wrapper };
}
describe('DeleteMovie component', () => {
    it('Should not render Delete Movie component', () => {
        const { wrapper } = setup(false);
        expect(wrapper.find('Modal.Header').exists()).toBe(false);
    })

    it('Should render Delete Movie component', () => {
        const { wrapper } = setup(true);
        expect(wrapper.find('.modal-header').length).toEqual(1);
        expect(wrapper.find('.modal-body').length).toEqual(1);
        expect(wrapper.find('.modal-footer').length).toEqual(1);
        expect(wrapper.find('.modal-footer').children()).toHaveLength(1);
    })

    it('Should render Delete Movie component', () => {
        const { wrapper } = setup(true);

        wrapper.update();
        expect(wrapper.find('.modal-header').length).toEqual(1);
        expect(wrapper.find('.modal-body').length).toEqual(1);
        expect(wrapper.find('.modal-footer').length).toEqual(1);
        wrapper.find('.modal-footer').children().find('Button').simulate('click');
    })
})