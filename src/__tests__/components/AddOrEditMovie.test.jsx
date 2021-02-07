import { mount, shallow } from 'enzyme'
import { useDispatch, useSelector } from 'react-redux';

import AddOrEditMovie from '../../components/AddOrEditMovie';
import CONSTANTS from '../../constants/constants';
import React from 'react'

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch
}));

function setup(show, mode, ...rest) {
    useSelector.mockImplementation((selectorFn) => selectorFn({
        movies: {
            data: [CONSTANTS.SAMPLE_MOVIE, CONSTANTS.SAMPLE_MOVIE],
            status: null,
            selectedMovie: CONSTANTS.SAMPLE_MOVIE,
            isLoading: false,
            mode,
        }
    }));
    const wrapper = mount(<AddOrEditMovie show={show} {...rest} />);
    return { wrapper };
}

describe('AddOrEditMovie component', () => {
    it('Should not render AddOrEditMovie dialogs child element Formik', () => {
        window.confirm = jest.fn(() => true);
        const { wrapper } = setup(false);
        expect(wrapper.find('Modal').exists()).toBe(true);
        expect(wrapper.find('Formik').exists()).toBe(false);
    })

    it('Should render AddOrEditMovie dialogs child element Formik', () => {
        window.confirm = jest.fn(() => true);
        const { wrapper } = setup(true);
        expect(wrapper.find('Modal').exists()).toBe(true);
        expect(wrapper.find('Formik').exists()).toBe(true);
    })
    it('Should test onReset fn', () => {
        window.confirm = jest.fn(() => true);
        const onSubmit = jest.fn().mockResolvedValueOnce({});
        const { wrapper } = setup(true, onSubmit);

        expect(wrapper.find('.modal-header').length).toEqual(1);
        expect(wrapper.find('.modal-body').length).toEqual(1);
        expect(wrapper.find('.modal-footer').length).toEqual(1);

        wrapper.find('.modal-footer').children().find('Button').at(0).simulate('click');

        wrapper.find('CloseButton').simulate('click');
    })

    it('Should test onSubmit fn', () => {
        const onSubmit = jest.fn().mockResolvedValueOnce({}, { setStatus: jest.fn() });
        const { wrapper } = setup(true, 'add', onSubmit);

        expect(wrapper.find('.modal-header').length).toEqual(1);
        expect(wrapper.find('.modal-body').length).toEqual(1);
        expect(wrapper.find('.modal-footer').length).toEqual(1);

        wrapper.find('form').simulate('submit');
        window.confirm = jest.fn(() => false);
    })

    it('Should test onSubmit fn', async () => {
        const onSubmit = jest.fn().mockResolvedValueOnce({}, { setStatus: jest.fn() });
        const { wrapper } = setup(true, 'add', onSubmit);

        expect(wrapper.find('.modal-header').length).toEqual(1);
        expect(wrapper.find('.modal-body').length).toEqual(1);
        expect(wrapper.find('.modal-footer').length).toEqual(1);

        wrapper.find(`button[type='submit']`).simulate('submit', { preventDefault: () => { } });
    })
})
