import React, {Component} from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    
    componentDidMount() {
        // axios.get('https://burger-builder-2dc74.firebaseio.com/ingredients.json').then(response => {
        //     this.setState({ingredients: response.data});
        // }).catch(err => {
        //     this.setState({error: true});
        // });
    }
    
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    
    purchaseContinueHandler = () => {
        const queryParams = []
        for (let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        }
        queryParams.push('price=' + this.props.price);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }
    
    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(key => ingredients[key]).reduce((acc, el) => acc + el, 0);
        this.setState({purchasable: sum > 0});
    }
    
    render () {
        const disabledInfo = {...this.props.ings};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if (this.props.ings) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls ingredientAdded={this.props.onIngredientAdded} ingredientRemoved={this.props.onIngredientRemoved} disabled={disabledInfo} price={this.props.price} purchasable={this.state.purchasable} ordered={this.purchaseHandler} />
                </React.Fragment>
            );
            orderSummary = <OrderSummary ingredients={this.props.ings} price={this.props.price} 
                        purchaseCancelled={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler} />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
