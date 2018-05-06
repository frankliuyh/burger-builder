import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(key => {
        return <li key={key}><span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}</li>;
    });
    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
            <Button btnType='Danger' clicked={props.purchaseCancelled}>CANCEL</Button>
        </React.Fragment>
    );
};

export default orderSummary;