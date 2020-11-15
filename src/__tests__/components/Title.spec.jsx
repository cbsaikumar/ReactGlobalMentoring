import CONSTANTS from '../../constants/constants';
import React from 'react'
import Title from '../../components/Title';
import { shallow } from 'enzyme'

function setup() {
    const wrapper = shallow(<Title />);
    return { wrapper };
}

describe('Title component', () => {
    it('Should render title netflixroulette', () => {
        const { wrapper } = setup();
        expect(wrapper.find('h5').exists()).toBe(true);
        expect(wrapper.getElement('h5').props.children).toEqual(CONSTANTS.NETFLIX);
    })
})
