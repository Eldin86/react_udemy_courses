// //Ovo je file koji cemo exportovati reducer koji koristimo
// //actionTypes je objekat posto smo ih sve exportovali, named export, tako da dobijemo objekat
// import * as actionTypes from './actions'
// //REDUCER
// const initialState = {
//     counter: 0,
//     results: []
// }

// const reducer = (state = initialState, action) => {
//     switch(action.type){
//         case actionTypes.INCREMENT:
//             return {
//                 ...state,
//                 counter: state.counter + 1
//             }
//         case actionTypes.DECREMENT:
//             return {
//                 ...state,
//                 counter: state.counter - 1
//             }
//         case actionTypes.ADD:
//             return {
//                 ...state,
//                 counter: state.counter + action.value
//             }
//         case actionTypes.SUBTRACT:
//             return {
//                 ...state,
//                 counter: state.counter - action.value
//             }
//         case actionTypes.STORE_RESULT:
//             //Push metoda radi na originalnom nizu, concat metoda vraca novi niz(novi niz plus argument koji dodamo concat metodi)
//             //Za manipulisanje nizom koristimo concat metodu, a ne push
//             const storedResult = state.results.concat({value: state.counter, id: new Date()})
//             console.log('[reducer.js -> storedResult]', storedResult)
//             return {
//                 ...state,
//                 results: storedResult
//             }
//         case actionTypes.DELETE_RESULT:
//             /*
//                 //I nacin brisanja elementa iz niza
//                 const id = 2;
//                                 //Kopiramo niz
//                 const newArray = [...state.results]
//                 newArray.splice(id, 1)
//             */
//            //II nacin brisanja elementa iz niza pomocu filtera
//            //filter vrati sve one elemente koji ispunjavaju uslov
//            const newArray = state.results.filter((result) => result.id !== action.resultElId)
//             return {
//                 ...state,
//                 results: newArray
//             }
//         default: ;
//     }
//     return state
// }

// export default reducer