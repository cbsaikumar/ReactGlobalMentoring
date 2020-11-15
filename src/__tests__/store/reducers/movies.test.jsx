import CONSTANTS from '../../../constants/constants'
import reducer from '../../../store/reducers/movies'
import types from '../../../store/actions/actionTypes'

const initialState = {
    data: [],
    status: null,
    selectedMovie: null,
    isLoading: false,
    mode: 'none',
}

describe('movies reducer', () => {
    describe('sync actions', () => {
        it('should return the initial state', () => {
            expect(reducer(undefined, {})).toEqual(initialState)
        })

        it('should handle SET_MODE', () => {
            expect(
                reducer(undefined, {
                    type: types.SET_MODE,
                    mode: 'add'
                })
            ).toEqual({
                data: [],
                status: null,
                selectedMovie: null,
                isLoading: false,
                mode: 'add',
            })
        })
        it('should handle IS_LOADING', () => {
            expect(
                reducer(undefined, {
                    type: types.IS_LOADING,
                    payload: true
                })
            ).toEqual({
                data: [],
                status: null,
                selectedMovie: null,
                mode: 'none',
                isLoading: true,
            })
        })
        it('should handle SELECT_MOVIE', () => {
            expect(
                reducer(undefined, {
                    type: types.SELECT_MOVIE,
                    movie: {
                        title: 'Avengers',
                        rating: 9.5
                    }
                })
            ).toEqual({
                data: [],
                status: null,
                mode: 'none',
                isLoading: false,
                selectedMovie: {
                    title: 'Avengers',
                    rating: 9.5
                },
            })
        })

        it('should handle LOAD_MOVIES', () => {
            expect(
                reducer(undefined, {
                    type: types.LOAD_MOVIES,
                    status: true
                })
            ).toEqual({
                data: [],
                status: 'LOAD_MOVIES',
                selectedMovie: null,
                isLoading: false,
                mode: 'none',
            })
        })

        it('should handle LOAD_MOVIES_ERROR', () => {
            expect(
                reducer(undefined, {
                    type: types.LOAD_MOVIES_ERROR,
                    status: true
                })
            ).toEqual({
                data: [],
                status: 'LOAD_MOVIES_ERROR',
            })
        })

        it('should handle LOAD_MOVIE_DETAILS_SUCCESS', () => {
            expect(
                reducer(undefined, {
                    type: types.LOAD_MOVIE_DETAILS_SUCCESS,
                    movie: {
                        data: CONSTANTS.SAMPLE_MOVIE
                    }
                })
            ).toEqual({
                data: [],
                status: null,
                selectedMovie: CONSTANTS.SAMPLE_MOVIE,
                isLoading: false,
                mode: 'none',
            })
        })

        it('should handle LOAD_MOVIES_SIMILAR_GENRE', () => {
            expect(
                reducer(undefined, {
                    type: types.LOAD_MOVIES_SIMILAR_GENRE,
                    movies: {
                        data: {
                            data: [CONSTANTS.SAMPLE_MOVIE]
                        }
                    }
                })
            ).toEqual({
                data: [CONSTANTS.SAMPLE_MOVIE],
                status: null,
                selectedMovie: null,
                isLoading: false,
                mode: 'none',
            })
        })

        it('should handle LOAD_MOVIES_SUCCESS', () => {
            expect(
                reducer(undefined, {
                    type: types.LOAD_MOVIES_SUCCESS,
                    movies: {
                        data: {
                            data: [CONSTANTS.SAMPLE_MOVIE]
                        }
                    }
                })
            ).toEqual({
                data: { data: { data: [CONSTANTS.SAMPLE_MOVIE] } },
                status: 'LOAD_MOVIES_SUCCESS',
                selectedMovie: null,
                isLoading: false,
                mode: 'none',
            })
        })
    })
})