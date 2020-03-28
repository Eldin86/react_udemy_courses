import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'


const burger = (props) => {
    //https://www.samanthaming.com/tidbits/76-converting-object-to-array/
    //Trebamo pretvoriti objekat u niz
    //Object.keys extract keys iz objekta i pretvara ih u niz
    console.log(Object.keys(props.ingredients))

    let transformedIngredients = Object.keys(props.ingredients)//['salad', 'bacon', 'cheese', 'meat']
        .map(igKey => {//igKey -> salad, bacon, cheee, meat
            //igKey je svaki item, salad, bacon, cheese, meat
            console.log('igKey:', igKey)
            console.log('ing number:', [...Array(props.ingredients[igKey])])
            //Niz od onoliko itema koliko ima kolicine koji ingredient, npr salad: 2, i dobijemo niz od 2 elementa
            //Pretvaramo string value u niz sa onoliko elemeneta koliko ima ingredienta za odredjeni ingredient(ako imamo 2 cheese ingredienta, onda pretvorimo u niz koji ima duzinu 2 elementa)
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                //I koliko ima elemenata u nizu za doredeni ingredient toliko puta kreira komponentu
               return <BurgerIngredient key={igKey+i} type={igKey} />
            })
        })
        //Reduce koristimo da bismo dobili flatten niz i da bismo mogli znati duzinu niza
        .reduce((arr, el) => {
            console.log('arr -> reduce():', arr)
            console.log('el -> reduce():', el)
            return arr.concat(el)
        }, [])

        console.log(transformedIngredients)

        if(transformedIngredients.length === 0){
            transformedIngredients = <h5>Please Add Ingredients</h5>
        }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            
            {transformedIngredients}

            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default burger