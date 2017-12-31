import React from 'react';
import BurgerIngridient from './BurgerIngridient/BurgerIngridient';

import classes from './Burger.css';

const burger = ( props ) => {
    return (
        <div className={ classes.Burger }>
            <BurgerIngridient type="bread-top" />
            <BurgerIngridient type="cheese" />
            <BurgerIngridient type="meat" />
            <BurgerIngridient type="bread-bottom" />
        </div>
    );
}

export default burger;