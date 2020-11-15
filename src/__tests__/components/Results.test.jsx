import { BrowserRouter } from 'react-router-dom';
import React from 'react'
import Results from '../../components/Results';
import { mount } from 'enzyme'

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useDispatch: () => mockDispatch
}));

function setup(items) {
    const wrapper = mount(<BrowserRouter>
        <Results items={items} />
    </BrowserRouter>);
    return { wrapper };
}
describe('Results page component', () => {
    it('Should render results page content', () => {
        const items = { items: 10 }
        const { wrapper } = setup(items);
        expect(wrapper.find('FormControl').exists()).toBe(true);
        wrapper.find('FormControl').simulate('change');
        wrapper.find('li').at(0).simulate('click');
    })

    it('Should render results page content', () => {
        const { wrapper } = setup();
        expect(wrapper.find('FormControl').exists()).toBe(false);
    })
})
