import React from 'react';
import BurgerIngridient from './BurgerIngridient/BurgerIngridient';

import classes from './Burger.css';

const burger = ( props ) => {  

    let transformedIngridients = Object.keys(props.ingridients)  //converting an object into array
    .map(igKey => {
        return [...Array(props.ingridients[igKey])] // an array with two elements
        .map((_, i) => {
            return <BurgerIngridient key={ igKey + i} type={ igKey } />;
        })
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []);

    if(transformedIngridients.length === 0){
        transformedIngridients = <p>Please start adding ingridients!</p>;
    }
    
    return (
        <div className={ classes.Burger }>
            <BurgerIngridient type="bread-top" />
            { transformedIngridients }
            <BurgerIngridient type="bread-bottom" />
        </div>
    );
}

export default burger;