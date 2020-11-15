import ErrorBoundary from '../../components/ErrorBoundary';
import React from 'react';
import { shallow } from 'enzyme';

describe('ErrorBoundary Component', () => {
  let element;
  beforeEach(() => {
    element = shallow(<ErrorBoundary><div>custom content</div></ErrorBoundary>);
  });

  it('should render ErrorBoundary component', () => {
    expect(element).toMatchSnapshot();
  });
  

  it('Snapshot test with default props', () => {
    expect(element.html()).toEqual('<div>custom content</div>');
  });

  it('Should render error message when hasError is set in the state', () => {
    element.setState({ hasError: true });
    expect(element.text()).toEqual('Error occurred while fetching the data!');
  });

  it('Should update component state when componentDidCatch is invoked', () => {
    element.instance().componentDidCatch('error', 'error');
    expect(element.state('hasError')).toEqual(true);
  });
});
