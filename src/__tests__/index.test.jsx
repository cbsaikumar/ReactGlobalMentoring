import '../index';

import ReactDOM from 'react-dom'

jest.mock('react-dom')

test('Renders the application', () => {
    expect(ReactDOM.render).toHaveBeenCalled()
})