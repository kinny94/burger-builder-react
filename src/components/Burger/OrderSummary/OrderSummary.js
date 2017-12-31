import React from 'react';
import Aux from '../../../hoc/Auxilary'

const orderSummary = ( props ) => {
    
    const ingridientSummary = Object.keys(props.ingridients)
                                .map(igKey => {
                                    return <li key={ igKey }>
                                                <span style={ {textTransform: 'capitalize'} }>{ igKey }</span>: { props.ingridients[igKey] }
                                            </li>
                                });
    
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingridients: </p>
            <ul>
                { ingridientSummary }
            </ul>
            <p>Continue to Checkout ?</p>
        </Aux>
    )
};

export default orderSummary;