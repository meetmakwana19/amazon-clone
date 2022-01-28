export const initialState = {
    cart: []
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                // return the state as it is in addition to some updates in the "cart"
                cart: [...state.cart, action.item]
            }
        default:
            return state;
    }
}

export default reducer;