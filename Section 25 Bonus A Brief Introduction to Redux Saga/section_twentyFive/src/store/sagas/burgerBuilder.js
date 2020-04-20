import axios from '../../axios-orders'
//put sluzi da dispatchamo novi action
import { put } from 'redux-saga/effects'
import * as actions from '../actions/index'

export function* initIngredientsSaga(action){
    try{
        const response = yield axios.get('https://burger-projekat-ii.firebaseio.com/ingredients.json')
        yield put(actions.setIngredients(response.data))
    }catch(error){
        yield put(actions.fetchIngredientsFailed())
    }
}