import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './burgerIngridient.css';
import BurgerBuilder from '../../../containers/BurgerBuilder/BurgerBuilder';


class BurgerIngridient extends Component {
    render(){
        let ingridient = null;
        
        switch( this.props.type ){
            
            case ('bread-bottom'):
                ingridient = <div className={ classes.BreadBottom }></div>;
                break;
            
            case ('bread-top'):
                ingridient = (
                    <div className={ classes.BreadTop }>
                        <div className={ classes.Seeds1 }></div>
                        <div className={ classes.Seeds2 }></div>
                    </div>
                );
            break;
            
            case ('meat'): 
                ingridient = <div className={ classes.Meat }></div>;
                break;
            
            case ('cheese'): 
                ingridient = <div className={ classes.Cheese }></div>;
                break;
            
            case ('salad'): 
                ingridient = <div className={ classes.Salad }></div>;
                break;
            
            case ('bacon'): 
                ingridient = <div className={ classes.Bacon }></div>;
                break;
            
            default: 
                ingridient = null;
        }
        
        return ingridient;
    }
}

BurgerBuilder.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngridient;