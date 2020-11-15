import {
    buildUrl,
    createMovie,
    deleteMovie,
    getMovie,
    loadMovies,
    loadMoviesError,
    loadMoviesRequest,
    loadMoviesSuccess,
    searchBy,
    searchMovieChange,
    setIsLoading,
    sortMovies,
    updateMovie,
} from '../../../store/actions/actionCreators';

import ACTION_TYPES from '../../../store/actions/actionTypes';
import configureMockStore from 'redux-mock-store';
import initialState from '../../../store/reducers/initialState';
import moxios from 'moxios';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockSuccess = response => ({
    status: 200,
    response,
});
const buildMockStore = (state = initialState) => mockStore(
    state,
);

const movieToUpdate = {
    "title": "La La Land",
    "tagline": "Here's to the fools who dream.",
    "vote_average": 7.9,
    "vote_count": 6782,
    "release_date": "2016-12-29",
    "poster_path": "https://image.tmdb.org/t/p/w500/ylXCdC106IKiarftHkcacasaAcb.jpg",
    "overview": "Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.",
    "budget": 30000000,
    "revenue": 445435700,
    "runtime": 128,
    "genres": [
        "Comedy",
        "Drama",
        "Romance"
    ],
    "id": 313369
}

describe('Action creator', () => {
    it('should create an action to search by movies', () => {
        const searchby = 'TITLE';
        const expectedAction = {
            type: ACTION_TYPES.SEARCH_BY,
            searchby,
        };

        expect(searchBy('TITLE')).toEqual(expectedAction);
    });

    it('should create an action to sort movies', () => {
        const sortby = 'RATING';
        const expectedAction = {
            type: ACTION_TYPES.SORT_MOVIES,
            sortby,
        };

        expect(sortMovies('RATING')).toEqual(expectedAction);
    });

    it('should create an action to load movies', () => {
        const expectedAction = {
            type: ACTION_TYPES.LOAD_MOVIES,
        };

        expect(loadMoviesRequest()).toEqual(expectedAction);
    });

    it('should create an action to when search phrase changed', () => {
        const mock = {
            data: {
                data: ['f'],
            },
        };
        const expectedAction = {
            type: ACTION_TYPES.SEARCH_MOVIE_CHANGE,
            phrase: {
                data: {
                    data: ['f'],
                },
            },
        };

        expect(searchMovieChange(mock)).toEqual(expectedAction);
    });

    it('should create an action when loading movies succeed', () => {
        const mock = {
            data: {
                data: ['fifty', 'wars', 'dragon'],
            },
        };
        const expectedAction = {
            type: ACTION_TYPES.LOAD_MOVIES_SUCCESS,
            movies: ['fifty', 'wars', 'dragon'],
        };

        expect(loadMoviesSuccess(mock)).toEqual(expectedAction);
    });

    it('should create an action when load movies failed', () => {
        const mock = 'error';
        const expectedAction = {
            type: ACTION_TYPES.LOAD_MOVIES_ERROR,
            error: mock,
        };

        expect(loadMoviesError(mock)).toEqual(expectedAction);
    });

    it('should build correct URL', () => {
        const expectedURL = 'http://localhost:4000/movies?search=fifty&searchBy=genres&sortBy=undefined&sortOrder=desc&limit=15';

        expect(buildUrl('genre', 'fifty')).toEqual(expectedURL);
    });

    it('should dispatch loadMoviesSuccess on success', () => {
        moxios.install();
        const store = buildMockStore();
        const response = {
            data: {
                data: ['test'],
            },
        };

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(mockSuccess(response.data));
        });

        const expected = [
            loadMoviesRequest(),
            setIsLoading(true),
            loadMoviesSuccess(response),
            setIsLoading(false),
        ];

        return store.dispatch(loadMovies())
            .then(() => {
                expect(store.getActions()).toEqual(expected);
            });
    });

    it('should dispatch loadMoviesFailed on error', () => {
        moxios.install();
        const store = buildMockStore();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 500,
                error: 'error',
            });
        });

        const expected = [
            loadMoviesRequest(),
            loadMoviesError('error'),
        ];

        return store.dispatch(loadMovies())
            .catch(() => {
                expect(store.getActions()).toEqual(expected);
            });
    });

    it('should dispatch deleteMovie on delete', () => {
        moxios.install();
        const store = buildMockStore();
        const response = {
            data: {
                data: ['test'],
            },
        };

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(mockSuccess(response.data));
        });

        const expected = [
            setIsLoading(true),
            loadMoviesRequest(),
            setIsLoading(true),
            setIsLoading(false),
        ];

        return store.dispatch(deleteMovie('1'))
            .then(() => {
                expect(store.getActions()).toEqual(expected);
            });
    });

    it('should dispatch deleteMovie on delete Error case', () => {
        moxios.install();
        const store = buildMockStore();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(new Error('Unknown'));
        });

        const expected = [
            setIsLoading(true),
            loadMoviesRequest(),
            setIsLoading(true),
            setIsLoading(false),
        ];

        return store.dispatch(deleteMovie('1'))
            .catch((error) => {
                console.log(error);
            });
    });

    it('should dispatch update movie on update', async () => {
        moxios.install();
        const store = buildMockStore();
        const response = {
            data: {
                data: 'yes',
            }
        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(mockSuccess(response.data));
        });

        return store.dispatch(updateMovie(response))
            .then(() => {
                expect(store.getActions().includes({ type: 'IS_LOADING', payload: true }))
            });
    });

    it('should dispatch deleteMovie on update Error case', () => {
        moxios.install();
        const store = buildMockStore();
        const response = {
            data: {
                data: ['test'],
            },
        };

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(new Error('Unknown'));
        });

        return store.dispatch(updateMovie(response))
            .catch((error) => {
                console.log(error);
            });
    });

    it('should dispatch create movie on create', async () => {
        moxios.install();
        const store = buildMockStore();
        const response = {
            data: {
                data: 'yes',
            }
        };

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith(mockSuccess(response.data));
        });

        return store.dispatch(createMovie(movieToUpdate))
            .then(() => {
                expect(store.getActions().includes({ type: 'IS_LOADING', payload: true }))
            });
    });
});
