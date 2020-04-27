import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList'

const Ingredients = () => {
  //Defaultno postvimo prazan niz, i dodavat cemo u njega vrijednosti
  const [userIngredients, setUserIngredients] = useState([])

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
  useEffect(() => {
    console.log('RENDERING INGREDIENTS', userIngredients)
  }, [userIngredients])

  //Handler kojim dodajemo ingredient koji takojder prima ingredient kao argument
  const addIngredientHandler = ingredient => {
    //Spremamo ingredientse u /ingredients
    //fetch defaultno koristi GET request, dok firebase koristi POST request defaultno ako zelimo da spremimo podatke
    //fetch vraca promise
    fetch('https://react-hooks-update-b8edf.firebaseio.com/ingredients.json', {
      //konfiguracijski objekat
      //metoda koju koristimo
      method: 'POST',
      //sta zelimo da posaljemo, tj u JSON formatu
      body: JSON.stringify(ingredient),
      //postavimo svoje headers
      headers: { 'Content-Type': 'application/json' }
    })
      //Kada je promise zavrsio trebamo da konvertujemo podatke iz JSON-a
      .then(response => {
        console.log('response', response)
        //extraktujemo iz jsona u js kod, odnosno parsiramo json u 
        return response.json()
      })
      .then(responseData => {
        console.log('Ingredients -> responseData', responseData)
        //funkcija ce se izvrsiti tek kad se request zavrsi
        //Spremimo vrijednost iz IngredientForm inputa  i spremimo u ingredients niz
        /*trebamo da updatujemo prijasnje ingrediente i dodamo nove, sto znaci da ovisimo o prethodnom 
        state-u, tako da nam treba funkcija, da bismo bili sigurno da dobijemo uvijek latest state*/
        /* prevIngredients je prethodni state */
        /* Vratimo niz */
        console.log(ingredient)
        console.log(userIngredients)
        setUserIngredients(prevIngredients => [
          //spredamo stari state, i dodamo ga novom state-u, odnosno kopiramo state
          ...prevIngredients,
          //Dodamo id posto nam treba, a nemamo ga za sad, i spreadamo odnosno updatujemo u novi state vrijednosti
          //iz ingredient koji je objekat
          { id: responseData.name, ...ingredient }])
      })
  }

  //handler koji updatuje vrijednosti iz searcha, prima ingredients koje proslijedimo u setUserIngredients
  /* useCallback koristimo da sprijecimo beskonacnu petlju koju izaziva onLoadIngredients u search komponenti
  a koju smo postavili kao dependency, jer se svaki put kad se promjeni rendera ponovo komponenta 
  i ponovo se kreiraju metode, hook prima dependency niz kao i */
  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    console.log('[Ingredients - filteredIngredients]', filteredIngredients)
    setUserIngredients(filteredIngredients)
  }, [])


  const removeIngredientHandler = ingredientId => {
    //posto u bazi imamo ingredients -> id, tako i proslijedimo u url taj id 
    //stablo u bazi npr (-M5s6ke7NZBySxrw5BEm)
    fetch(`https://react-hooks-update-b8edf.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    })
      .then(response => {
        setUserIngredients(prevIngredients =>
          prevIngredients.filter(ingredient => ingredient.id !== ingredientId))
      })
  }


  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {/* proslijedimo userIngredients kao niz u IngredientList */}
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
