import { CartContext } from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (/*previous State snapshot */ prevCartState, /* action dispatched*/ action) => {
    if (action.type === 'ADD_ITEM') {
        //check if item already exists, then just update the amount
        let itemIdx = prevCartState.items.findIndex(item => item.id === action.item.id);
        let updatedItems;
        if (itemIdx !== -1) {
            let existingItem = prevCartState.items[itemIdx];
            let updatedItem = {
                ...existingItem,
                amount: prevCartState.items[itemIdx].amount + action.item.amount
            }
            updatedItems = [...prevCartState.items];
            updatedItems[itemIdx] = updatedItem;
        } else {
            updatedItems = [...prevCartState.items, action.item];
        }
        const updatedTotalAmount = prevCartState.totalAmount + (action.item.price * action.item.amount);
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    } else if (action.type === 'REMOVE_ITEM') {

        const itemToBeDeletedIdx = prevCartState.items.findIndex(item => item.id === action.id);
        const updatedTotalAmount = prevCartState.totalAmount - (prevCartState.items[itemToBeDeletedIdx].price);
        let updatedItems;
        if (prevCartState.items[itemToBeDeletedIdx].amount === 1) {
            updatedItems = prevCartState.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...prevCartState.items[itemToBeDeletedIdx], amount: prevCartState.items[itemToBeDeletedIdx].amount - 1 }
            updatedItems = [...prevCartState.items];
            updatedItems[itemToBeDeletedIdx] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    //return new state snapshot
    return defaultCartState;
}

//manage cart context data
export function CartProvider({ children }) {
    //const [state, dispatchFn] = useReducer(ReducerFn, initialState, initFn);
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);


    const addItemToCartHandler = item => dispatchCartAction({ type: 'ADD_ITEM', item });


    const removeItemFromCartHandler = id => dispatchCartAction({ type: 'REMOVE_ITEM', id });


    const store = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }
    return (
        <CartContext.Provider value={store}>
            {children}
        </CartContext.Provider>
    )
}