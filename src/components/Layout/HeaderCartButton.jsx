import React, { useContext, useEffect, useState } from 'react';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import { CartContext } from '../../store/cart-context';

const HeaderCartButton = props => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const { items } = useContext(CartContext);
  useEffect(() => {
    if (items.length === 0) return;
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => setBtnIsHighlighted(false), 300);
    return () => clearTimeout(timer);
  }, [items]);

  const numberOfItems = items.reduce((acc, item) => acc + item.amount, 0);
  let btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  )
}

export default HeaderCartButton