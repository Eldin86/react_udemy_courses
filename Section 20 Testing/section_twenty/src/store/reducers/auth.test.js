//enzyme nam ne treba jer ne testiramo react komponente
import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'

describe('auth reducer', () => {
    //testiramo da dobijemo pravi init state ako proslijedimo invalidan action
    it('should return the inital state', () => {
        //ocekujemo reducer
        //undefined je inicijalni state, i action kao prazan objekat
        //ocekujemo da bude toEqual stateu u reducer funkciji
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })

    //testiramo da li imamo token prilikom logiranja, odnosno da li ga spremimo
    it('should store the token upon login', () => {
        //proslijedimo actions i state koji nam trebaju za odgovarajuci test
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }), {
            type: actionTypes.AUTH_SUCCESS,
            //token i userid moraju biti isti i u actions i u toEqual metodi kad testiramo
            idToken: 'some-token',
            userId: 'user-ID'
        }).toEqual({
            token: 'some-token',
            userId: 'user-ID',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
})