import React, { useContext } from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import { CartContext } from '../../../store/cart-context';

const MealItem = ({ meal }) => {
    const cartStore = useContext(CartContext);
    const price = `$${meal.price.toFixed(2)}`;
    const addItemToCartHandler = enteredAmount => {
        const newItem = {
            ...meal,
            amount: enteredAmount
        }
        cartStore.addItem(newItem);
    }
    return (

        <li className={classes.meal}>
            <div>
                <h3>{meal.name}</h3>
                <div className={classes.description}>
                    {meal.description}
                </div>
                <div className={classes.price}>
                    {price}
                </div>
            </div>

            <div>
                <MealItemForm id={meal.id} onAddItemToCart={addItemToCartHandler} />
            </div>
        </li>

    )
}

export default MealItem