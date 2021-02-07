import Footer from '../../components/Footer';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Footer component', () => {
    it('should render correctly', () => {
        const tree = renderer
            .create(<Footer />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})