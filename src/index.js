import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import CartCountState from './context/cart-count/CartCountState';
import { StateProvider } from './context/cart-count/CartStateContext';
import reducer, { initialState } from "./state/reducers/reducer"

ReactDOM.render(
  <React.StrictMode>
    {/* <CartCountState> */}
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
    {/* </CartCountState> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
