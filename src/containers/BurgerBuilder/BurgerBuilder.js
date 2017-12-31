import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component{

    constructor( props ){
        super( props );
        this.state = {
            ingridients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            }
        };
    }

    render(){
        return (
            <Aux>
                <Burger ingridients={ this.state.ingridients }/>
                <div>Build Controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;