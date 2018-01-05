import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger'; 
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

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
            ingridients: null,
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false
        };
    }

    componentDidMount(){
        
        axios.get('https://burger-builder-application.firebaseio.com/ingridients.json')
        .then((response) => {
            this.setState({
                ingridients: response.data
            });
        })
        .catch((error) => {
            this.setState({
                error: true
            });
        });
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
        //alert('You continue');

        // this.setState({
        //     loading: true
        // });

        // const order = {
        //     ingridients: this.state.ingridients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Arjun Dass',
        //         address: {
        //             street: '208 South Street',
        //             zipCode: '07307',
        //             country: 'United States'
        //         },
        //         email: 'ad.sam007@gmail.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }

        // axios.post('/orders.json', order).then((response) => {
        //     this.setState({
        //         loading: false,
        //         purchasing: false
        //     });
        // }).catch((err) => {
        //     this.setState({
        //         loading: false,
        //         purchasing: false
        //     });
        //     console.log(err);
        // });

        this.props.history.push('/checkout');
        
    }

    render(){

        const disabledInfo = {
            ...this.state.ingridients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        } 
        
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingridients can't be loaded!</p> : <Spinner />;

        if( this.state.ingridients ){
            burger = (
                <Aux>
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

            orderSummary = <OrderSummary 
                ingridients={ this.state.ingridients }
                purchaseCancelled={ this.purchaseCancelHandler }
                purchaseContinued={ this.purchaseContinueHandler }
                price={ this.state.totalPrice }
            />;
        }

        if( this.state.loading ){
            orderSummary = <Spinner />;
        } 
        // { salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal 
                    show={ this.state.purchasing }
                    modalClosed={ this.purchaseCancelHandler }
                    > 
                    { orderSummary }
                </Modal>
                { burger }
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);