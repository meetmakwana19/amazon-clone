import { createContext, useContext, useReducer } from "react"

// Created the context layer for state distribution.
const CartStateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
    <CartStateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </CartStateContext.Provider>
)

// pulls data from the global context layer
export const useStateValue = () => useContext(CartStateContext);