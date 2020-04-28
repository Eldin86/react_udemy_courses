import React, {useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from '../UI/LoadingIndicator'

//react memo usporedjuje props i ako se props promjeni, onda ce se komponenta rerenderati
const IngredientForm = React.memo(props => {
  //useState koristimo kao zamjenu za state koji je u class komponentama
  //Mozemo definisati inicijalni state, moze biti objekat, niz, primitive value...
  //dakle moze biti bilo koja vrijednost, dok u class komponentama state je uvijek objekat
  //Trenutno inicijaliziramo state sa 2 vrijednosti, one koje nam trebaju za formu
  //useState je namjenjen da se koristi tako da koristimo vise useState
  const [enteredTitle, setEnteredTitle] = useState('')
  const [enteredAmount, setEnteredAmount] = useState('')
  console.log('RENDERING INGREDIENT FORM')

  const submitHandler = event => {
    event.preventDefault();
    //proslijedimo kao objekat vrijednosti title i amount
    props.onAddIngredient({
      title: enteredTitle,
      amount: enteredAmount
    })
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input 
              type="text" 
              id="title" 
              value={enteredTitle} 
              onChange={event => {
                setEnteredTitle(event.target.value)
              }}/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input 
              type="number" 
              id="amount"  
              value={enteredAmount} 
              onChange={event => {
                setEnteredAmount(event.target.value)
              }}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {/* samo ako je loading true renderaj LoadingIndicator */}
            {props.loading && <LoadingIndicator/>}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
