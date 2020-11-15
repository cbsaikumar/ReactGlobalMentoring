import ACTION_TYPES from '../../store/actions/actionTypes';
import sortby from '../../store/reducers/sortBy';

describe('Sortby reducer', () => {
  it('should return the expected state', () => {
    const mock = {
      type: ACTION_TYPES.SORT_MOVIES,
      sortby: 'RATING',
    };
    const expectedState = 'RATING';

    expect(sortby({}, mock)).toStrictEqual(expectedState);
  });

  it('should return the expected state when default state is undefined', () => {
    const mock = {
      type: ACTION_TYPES.SORT_MOVIES,
      sortby: 'RATING',
    };
    const expectedState = 'RATING';

    expect(sortby(undefined, mock)).toStrictEqual(expectedState);
  });
});
