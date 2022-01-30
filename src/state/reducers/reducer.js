export const initialState = {
    cart: [],
    user: null
};

// to tally up all the item sellprices in a fancy way- SELECTOR
export const getCartTotal = (cart) =>
    // iterate for each "item"
    cart?.reduce((initialAmount, item) => item.sellPrice + initialAmount, 0);

const reducer = (state, action) => {
    console.log("Reducer action :", action);
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                // return the state as it is in addition to some updates in the "cart"
                cart: [...state.cart, action.item]
            };

        case "DELETE_FROM_CART":
            const index = state.cart.findIndex(
                // findOne func helps to find the item from cart whose id= is = to the id of action we sent. After finding it wont return back to re-iterate in the same cycle.
                (cartItem) => cartItem.dispatched_id === action.dispatched_id
            )
            // copying the current cart state into a temporary variable before deleting
            let updatedCart = [...state.cart]
            if (index >= 0) {
                // item found for deleting(index greater than 0)
                updatedCart.splice(index, 1)
                // deletes(splices) from the index count till 1, means only that 1 item will be deleted.
            }
            else {
                console.warn(`Can't remove the product (${action.dispatched_id} as it is not present in th cart.)`)
            }
            return {
                ...state,
                cart: updatedCart
            };

        case "SET_USER":
            return {
                ...state,
                user: action.user //updated user from the action dispatched from component like `SignIn.js`
            }
        default:
            return state;
    }
}

export default reducer;