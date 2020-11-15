import AddMovie from '../../components/AddMovieButton';
import React from 'react'
import { mount } from 'enzyme'

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useDispatch: () => mockDispatch
}));

function setup() {
    const wrapper = mount(<AddMovie />);
    return { wrapper };
}

describe('Add Movie Button component', () => {
    it('Should render Add Movie button component', () => {
        const { wrapper } = setup();
        expect(wrapper.find('button').length).toEqual(1);
        wrapper.find('button').simulate('click');
    })
})
