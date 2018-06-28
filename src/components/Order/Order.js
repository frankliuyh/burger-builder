import React from 'react';
import classes from './Order.css';

const order = (props) => {
	const ingredients = [];
	for (let ingredient in props.ingredients) {
		ingredients.push({name: ingredient, amount: props.ingredients[ingredient]});
	}
	const ingredientsOutput = ingredients.map(ig => (<span key={ig.name} 
														style={{
															textTransform: 'capitalize',
															display: 'inline-block',
															margin: '0 8px',
															border: '1px solid #ccc',
															padding: '5px'}}>
														{ig.name} ({ig.amount})</span>));

	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingredientsOutput}</p>
			<p>Price: <strong>${props.price.toFixed(2)}</strong></p>
		</div>
	);
}

export default order;