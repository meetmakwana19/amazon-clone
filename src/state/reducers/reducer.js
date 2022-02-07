export const initialState = {
    cart: [],
    filledCart: [],
    orderHistory: [],
    user: "",
    address: "",
    user_id: "",
};

// to tally up all the item sellprices in a fancy way- SELECTOR
export const getCartTotal = (filledCart) =>
    // iterate for each "item"
    filledCart?.reduce((initialAmount, item) => item.sellPrice + initialAmount, 0);

const reducer = (state, action) => {
    console.log("Reducer action :", action.address);
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user //updated user from the action dispatched from component like `SignIn.js`
            }
        case "SET_USER_ID":
            return {
                ...state,
                user_id: action.user_id //updated user from the action dispatched from component like `SignIn.js`
            }
        case "SET_ADDRESS":
            // console.log("address reduces", action);
            return {
                ...state,
                address: action.address //updated user from the action dispatched from component like `SignIn.js`
            }
        case "ADD_TO_CART":
            console.log("add to cart action");
            return {
                ...state,
                // return the state as it is in addition to some updates in the "cart"
                cart: [...state.cart, action.item]
            };
        case "FILL_TO_CART":
            // console.log("fill to cart action");
            return {
                ...state,
                // return the state as it is in addition to some updates in the "cart"
                filledCart: [...state.filledCart, action.item]
            };
        case "FILL_ORDER_HISTORY":
            return {
                ...state,
                // return the state as it is in addition to some updates in the "cart"
                orderHistory: [...state.orderHistory, action.item]
            };
        case "EMPTY_CART":
            console.log("Emptying cart");
            return {
                ...state,
                cart: [],
                filledCart: [],
                orderHistory: []
            }

        case "DELETE_FROM_CART":
            const index = state.filledCart.findIndex(
                // findOne func helps to find the item from cart whose id= is = to the id of action we sent. After finding it wont return back to re-iterate in the same cycle.
                (cartItem) => cartItem.dispatched_id === action.dispatched_id
            )
            // copying the current cart state into a temporary variable before deleting
            let updatedCart = [...state.filledCart]
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
                filledCart: updatedCart
            };
        default:
            return state;
    }
}

export default reducer;