import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = ( props ) => (
    <div className={ classes.BuildControls }>
        <p>Current Price: <strong>{ props.price.toFixed(2) }</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ ctrl.label } 
                label={ ctrl.label }
                added= {() => props.ingridientsAdded( ctrl.type )}
                removed={() => props.ingridientsRemoved( ctrl.type )}
                disabled={ props.disabled[ctrl.type]}
            />
        ))}

        <button 
            className={ classes.OrderButton }
            disabled={ !props.purchasable }
            onClick={ props.ordered }
        >{ props.isAuth ? 'ORDER': 'SIGN UP TO ORDER' }</button>
    </div>
);

export default buildControls;