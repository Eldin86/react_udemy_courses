import React, { useState, useEffect, useCallback, useReducer, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal'
import useHttp from '../../hooks/http'

//definisemo reducer
//funkcija prima 2 argumenta automatski koja proslijedi react
const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients
    case 'ADD':
      return [...currentIngredients, action.ingredient]
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id)
    default:
      throw new Error('Should not get there')
  }
}

// const httpReducer = (curHttpState, action) => {
//   switch (action.type) {
//     case 'SEND':
//       //u returnu koristimo error ili spinner
//       //kad saljemo request prikazujemo spinner
//       return { loading: true, error: null }
//     case 'RESPONSE':
//       //spreadamo da bi overwrite propertije koje vec imamo a koje necemo mjenjati, npr error, ili loading ako je true, da ga stavimo na false
//       //spreadamo da zadrzimo error vrijednost posto je u ovome actionu ne koristimo  
//       return { ...curHttpState, loading: false }
//     case 'ERROR':
//       return { loading: false, error: action.errorMessage }
//     case 'CLEAR':
//       return {...curHttpState, error: null}
//     default:
//       //ako dodjemo do ovoga onda nismo dispatchali neki action koji nismo handlali
//       throw new Error('Should not be reached')
//   }
// }

const Ingredients = () => {
  //KAD RADIMO SA USEREDUCER REACT CE UVIJEK RERENDERATI KOMPONENTU KAD GOD REDUCER VRATI NOVI STATE
  //useReducer prima reducer funkciju, i opcionalni defaultni state, u ovom slucaju prazan niz
  //useReducer vraca dvije funkcije, state, i dispatcher
  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])
  //const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null })

  //propertiji koje hook vraca, samo smo ih ekstraktovali
  const { isLoading, error, data, sendRequest, reqExtra, reqIdentifier, clear } = useHttp()

  //Defaultno postvimo prazan niz, i dodavat cemo u njega vrijednosti
  //**reducer umjesto ovoga -> const [userIngredients, setUserIngredients] = useState([])
  //**reducer umjesto ovoga -> const [isLoading, setIsLoading] = useState(false)
  //**reducer umjesto ovoga -> const [error, setError] = useState()

  //Mozemo da radimo sideEffects u ovome hook, npr npr http request
  /*hook se izvrsi NAKON svakog ciklusa renderanja komponente, i PRI svakom ponovnom renderanju
  tj funkcija unutar hook-a*/
  /*useEffect mozemo koristiti kao componentDidUpdate, componentDidMount i componentWillUpdate */
  /* kad je prazan niz drugi argument useEffect se ponasao kao componentDidMount, odnosno samo se
  jednom rendera poslije prvog renderanja */
  // useEffect(() => {
  //   fetch('https://react-hooks-update-b8edf.firebaseio.com/ingredients.json')
  //     .then(response => {
  //       return response.json()
  //     })
  //     .then(responseData => {
  //       console.log('[Ingredients.js] -> responseData', responseData)
  //       const loadedIngredients = [];
  //       for (const key in responseData) {
  //         loadedIngredients.push({
  //           id: key,
  //           title: responseData[key].title,
  //           amount: responseData[key].amount
  //         })
  //       }
  //       setUserIngredients(loadedIngredients)
  //     })
  //   /*drugi argument je niz sa dependency, samo kad se dependency promjeni funkcija se pokrene*/
  //   /*Ako je prazan niz znaci da nemamo externih dependency i rendera se komponenta samo jednom odnosno
  //   kad se prvi put rendera */
  //   /* Ako imamo vrijednost u nizu znaci da ako se ta eksterna vrijednost(vrijednost van useEffect) 
  //   promjeni onda se rendera ponovo komponenta */
  // }, [])

  /* useEffect ce se pokrenuti samo kad se userIngredients promjeni */
  //SVAKI PUT KAD KORISTIMO EXTERNU VARIJABLU UNUTAR USEEFFECT MORAMO JE STAVITI KAO DEPENDENCY
  useEffect(() => {
    if (!isLoading && !error && reqIdentifier === 'REMOVE_INGREDIENT') {
      dispatch({ type: 'DELETE', id: reqExtra })
    }else if(!isLoading && !error &&reqIdentifier === 'ADD_INGREDIENT'){
      dispatch({type: 'ADD', ingredient: {id: data.name, ...reqExtra}})
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error])

  //Handler kojim dodajemo ingredient koji takojder prima ingredient kao argument
  const addIngredientHandler = useCallback(ingredient => {
    sendRequest(
      'https://react-hooks-update-b8edf.firebaseio.com/ingredients.json', 
      'POST', 
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT'
      )
    // dispatchHttp({ type: 'SEND' })
    // //postavljamo loading spinner na true prije nego dohvatimo podatke, a u procesu smo dohvacanja podataka
    // //**reducer umjesto ovoga -> setIsLoading(true)
    // //Spremamo ingredientse u /ingredients
    // //fetch defaultno koristi GET request, dok firebase koristi POST request defaultno ako zelimo da spremimo podatke
    // //fetch vraca promise
    // fetch('https://react-hooks-update-b8edf.firebaseio.com/ingredients.json', {
    //   //konfiguracijski objekat
    //   //metoda koju koristimo
    //   method: 'POST',
    //   //sta zelimo da posaljemo, tj u JSON formatu
    //   body: JSON.stringify(ingredient),
    //   //postavimo svoje headers
    //   headers: { 'Content-Type': 'application/json' }
    // })
    //   //Kada je promise zavrsio trebamo da konvertujemo podatke iz JSON-a
    //   .then(response => {
    //     dispatchHttp({type: 'RESPONSE'})
    //     //kad smo dohvatili podatke stavimo na false loading
    //     //**reducer umjesto ovoga -> setIsLoading(false)
    //     console.log('response', response)
    //     //extraktujemo iz jsona u js kod, odnosno parsiramo json u 
    //     return response.json()
    //   })
    //   .then(responseData => {
    //     console.log('Ingredients -> responseData', responseData)
    //     //funkcija ce se izvrsiti tek kad se request zavrsi
    //     //Spremimo vrijednost iz IngredientForm inputa  i spremimo u ingredients niz
    //     /*trebamo da updatujemo prijasnje ingrediente i dodamo nove, sto znaci da ovisimo o prethodnom 
    //     state-u, tako da nam treba funkcija, da bismo bili sigurno da dobijemo uvijek latest state*/
    //     /* prevIngredients je prethodni state */
    //     /* Vratimo niz */
    //     console.log(ingredient)
    //     console.log(userIngredients)


    //     ////**reducer umjesto ovoga ->  setUserIngredients(prevIngredients => [
    //     //   //spredamo stari state, i dodamo ga novom state-u, odnosno kopiramo state
    //     //   ...prevIngredients,
    //     //   //Dodamo id posto nam treba, a nemamo ga za sad, i spreadamo odnosno updatujemo u novi state vrijednosti
    //     //   //iz ingredient koji je objekat
    //     //   { id: responseData.name, ...ingredient }])

    //     dispatch({ type: 'ADD', ingredient: { id: responseData.name, ...ingredient } })
    //   })
    //sa praznim nizom kao dependency funkcija se nikad nece rebuild
  }, [sendRequest])

  //handler koji updatuje vrijednosti iz searcha, prima ingredients koje proslijedimo u setUserIngredients
  /* useCallback koristimo da sprijecimo beskonacnu petlju koju izaziva onLoadIngredients u search komponenti
  a koju smo postavili kao dependency, jer se svaki put kad se promjeni rendera ponovo komponenta 
  i ponovo se kreiraju metode, hook prima dependency niz kao i */
  //useCallback kad hocemo da sprijecimo funkciju da se kreira na svaki rerender
  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    console.log('[Ingredients - filteredIngredients]', filteredIngredients)
    //**reducer umjesto ovoga -> setUserIngredients(filteredIngredients)
    //dispatch je obicno objekat
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, [])

  //useCallback kad hocemo da sprijecimo funkciju da se kreira na svaki rerender
  const removeIngredientHandler = useCallback(ingredientId => {
    sendRequest(
      `https://react-hooks-update-b8edf.firebaseio.com/ingredients/${ingredientId}.json`, 
      'DELETE', 
      null, 
      ingredientId,
      'REMOVE_INGREDIENT'
      )

  }, [sendRequest])

  // //useCallback kad hocemo da sprijecimo funkciju da se kreira na svaki rerender
  // const clearError = useCallback(() => {
  //   clear()
  //   //dispatchHttp({type: 'CLEAR'})
  //   //ove dvije funkcije se izvrsavaju sinhrono jedna iza druge
  //   //**reducer umjesto ovoga -> setError(null)
  //   //setIsLoading(false)
  // }, [])

  const ingredientList = useMemo(() => {
    //vratimo vrijednost koju zelimo memoize
    /* proslijedimo userIngredients kao niz u IngredientList */
    return <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
    //takodjer imamo listu dependency, govori kad da rerun funkciju da kreira novi objekat koji treba memoize
    //kad se userIngredients promjeni onda rerun funkciju, removeIngredientsHanlder nece se mjenjati jer korisitmo useCallback
  }, [userIngredients, removeIngredientHandler])

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />

        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
