import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';
import ErrorModal from '../UI/ErrorModal'
import useHttp from '../../hooks/http'

const Search = React.memo(props => {
  //Ekstraktujemo samo metodu da bismo je proslijedili kao dependency, da ne moramo cijele props proslijediti
  //Ekstraktovali smo samo metodu i proslijedili je kao dependency da ne bi citav props objekat proslijedili kao dependency
  const { onLoadIngredients } = props
  const [enteredFilter, setEnterdFilter] = useState('')
  //koristimo da kreiramo referencu na odredjeni element
  const inputRef = useRef()
  const {isLoading, data, error, sendRequest, clear} = useHttp()

  //Hook u kojem filtriramo odnosno search items iz baze
  useEffect(() => {
    console.log('inputRef', inputRef)
    console.log('enteredFilter', enteredFilter)
    console.log('inputRef.current.value', inputRef.current.value)
    /* tek nakons to istekne setTimeout vrijeme provjerava se vrijednost koju je user unio u input */
    //samo ako napravimo kratku od 500ms pauzu poslat cemo request
    const timer = setTimeout(() => {
      //current je objekat koji inputRef ima
      //enteredFilter je vrijednost od prije 500ms odnosno stara vrijednost
      //Ako je prethodna vrijednost jednaka trenutnoj rijednosti koju smo unijeli u inputu
      if (enteredFilter === inputRef.current.value) {
        /* ako je duzina enteredFilter jednaka 0 vrati prazan string, inace filtriraj po vrijednosti */
        const query = enteredFilter.length === 0
          ? ''
          : `?orderBy="title"&equalTo="${enteredFilter}"`
          sendRequest('https://react-hooks-update-b8edf.firebaseio.com/ingredients.json' + query, 'GET')
      }

    }, 500)
    //kad god vratimo nesto unutar useEffect to mora biti funkcija, koja je cleanup
    /* funkcija koja se pokrece upravo prije nego se useEffect pokrene sljedeci put */
    //kad se tek prvi put useEffect pokrene, cleanup funkcija se ne pokrece, tek nakon drugog puta
    //cleanup funkcija se pokrece kad god se komponenta unmounta
    return () => {
      clearTimeout(timer)
    }
    /* enteredFilter i onLoadIngredients nam je dependency */
    /* Posto kad kucamo u search inputu, vrijednost se na svaki keystroke mjenja, tako da nam se
    i useEffect updatuje svaki put */
  }, [enteredFilter, inputRef, sendRequest])

  useEffect(() => {
    if(!isLoading && !error && data){
        const loadedIngredients = [];
        for (const key in data) {
          loadedIngredients.push({
            id: key,
            title: data[key].title,
            amount: data[key].amount
          })
        }
        /*onLoadIngredients funkcija koju proslijedimo Search komponenti u Ingredients */
        /* onLoadIngredients je metoda koju smo ekstraktovali iz props a koju smo prosliedili iz Ingredients */
      onLoadIngredients(loadedIngredients)
    }
  }, [data, isLoading, error, onLoadIngredients])

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>error</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input ref={inputRef} type="text" onChange={event => setEnterdFilter(event.target.value)} value={enteredFilter} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
