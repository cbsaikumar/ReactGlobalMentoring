import ErrorMessage from '../../components/ErrorMessage';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('should render ErrorMessage component', () => {
  it('Snapshot test with default props', () => {
    const tree = renderer
      .create(<ErrorMessage message="Test message" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render error message', () => {
    const element = shallow(<ErrorMessage message="Test message" />);
    expect(element.text()).toEqual('Test message');
  });
});
