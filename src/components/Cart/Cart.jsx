import React, { useContext } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import { CartContext } from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = ({ onHideCart }) => {
    const { items, totalAmount, addItem, removeItem } = useContext(CartContext);
    const totalCartAmount = `$${totalAmount.toFixed(2)}`;
    const addItemToCartHandler = item => {
        addItem({...item, amount: 1});
    }
    const removeItemFromCartHandler = id => {
        removeItem(id);
    }

    const cartItems = <ul className={classes['cart-items']}>{items.map(item =>
        <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove={removeItemFromCartHandler.bind(null, item.id)}
            onAdd={addItemToCartHandler.bind(null, item)}
        />)}</ul>



    return (
        <Modal onClick={onHideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalCartAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={onHideCart}>Close</button>
                {totalAmount > 0 && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart