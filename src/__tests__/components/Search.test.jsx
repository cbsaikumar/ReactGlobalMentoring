import ACTION_TYPES from '../../store/actions/actionTypes';
import search from '../../store/reducers/search';

describe('Search reducer', () => {
  it('should return the expected state', () => {
    const mock = {
      type: ACTION_TYPES.SEARCH_BY,
      searchby: 'TITLE',
    };
    const expectedState = {
      searchby: 'TITLE',
    };

    expect(search({}, mock)).toStrictEqual(expectedState);
  });

  it('should return the expected state', () => {
    const mock = {
      type: ACTION_TYPES.SEARCH_MOVIE_CHANGE,
      phrase: 'TITLE',
    };
    const expectedState = {
      phrase: 'TITLE',
    };

    expect(search({}, mock)).toStrictEqual(expectedState);
  });

  it('should return the default state when action type is invalid', () => {
    const mock = {
      type: 'WRONG_TYPE',
      phrase: 'FIFTY',
    };
    const expectedState = {
      search: {
        searchby: 'TITLE',
        phrase: '',
      },
    };

    expect(search(expectedState, mock)).toStrictEqual(expectedState);
  });

  it('should return the expected state when default state is undefined', () => {
    const mock = {
      type: ACTION_TYPES.SEARCH_MOVIE_CHANGE,
      phrase: 'FIFTY',
    };
    const expectedState = {
      phrase: 'FIFTY',
      searchby: 'title',
    };

    expect(search(undefined, mock)).toStrictEqual(expectedState);
  });
});
