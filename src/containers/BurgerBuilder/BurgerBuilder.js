import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger'; 
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGRIDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.2,
    bacon: 1
}

class BurgerBuilder extends Component{

    constructor( props ){
        super( props );
        this.state = {
            ingridients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4,
            purchasable: false,
            purchasing: false
        };
    }

    updatePurchaseState(ingridients){

        const sum = Object.keys(ingridients).map(igKey => {
            return ingridients[igKey];
        }).reduce((sum, el) => {
            return sum + el;    
        }, 0);
        
        this.setState({
            purchasable: sum > 0
        });
    }

    addIngridientHandler = ( type ) => {
        const oldCount = this.state.ingridients[type];
        const updatedCount = oldCount + 1;
        const upgratedIngridients = {
            ...this.state.ingridients
        }

        upgratedIngridients[type] = updatedCount;
        const priceAddition = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingridients: upgratedIngridients    
        });

        this.updatePurchaseState(upgratedIngridients);
    }

    removeIngridientHandler = ( type ) => {
        const oldCount = this.state.ingridients[type];

        if(oldCount <= 0){
            return;
        }

        const updatedCount = oldCount - 1;
        const upgratedIngridients = {
            ...this.state.ingridients
        }

        upgratedIngridients[type] = updatedCount;
        const priceDeduction = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice,
            ingridients: upgratedIngridients    
        });

        this.updatePurchaseState(upgratedIngridients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing:  false
        });
    }

    purchaseContinueHandler = () => {
        alert('You continue');
    }

    render(){

        const disabledInfo = {
            ...this.state.ingridients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }   

        // { salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal 
                    show={ this.state.purchasing }
                    modalClosed={ this.purchaseCancelHandler }
                    > 
                    <OrderSummary 
                        ingridients={ this.state.ingridients }
                        purchaseCancelled={ this.purchaseCancelHandler }
                        purchaseContinued={ this.purchaseContinueHandler }
                        price={ this.state.totalPrice }
                    />
                </Modal>

                <Burger ingridients={ this.state.ingridients }/>
                <BuildControls 
                    ingridientsAdded={ this.addIngridientHandler }
                    ingridientsRemoved={ this.removeIngridientHandler }
                    disabled={ disabledInfo }
                    price={ this.state.totalPrice }
                    purchasable={ this.state.purchasable }
                    ordered={ this.purchaseHandler }
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;