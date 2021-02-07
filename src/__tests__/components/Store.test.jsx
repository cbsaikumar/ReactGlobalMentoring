import configureMockStore from 'redux-mock-store';
import initialState from '../../store/reducers/initialState';

const mockStore = configureMockStore();

describe('Store', () => {
  const store = mockStore({ ...initialState });
  it('should have a getState method that will restore the default state', () => {
    const expectedState = {
      ...initialState,
    };
    expect(store.getState()).toEqual(expectedState);
  });
});
