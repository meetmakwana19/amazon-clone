import React from 'react';
import { useStateValue } from '../context/cart-count/CartStateContext';
import { getCartTotal } from '../state/reducers/reducer';
import "../css/SubTotal.css"
import { useNavigate } from 'react-router-dom';

export default function SubTotal() {

    const [{ cart }] = useStateValue();

    const navigate = useNavigate();

    return (
        <div>
            <div className="section-right">
                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="" />
                <div className="subtotal-box">

                    <h5>Subtotal ({cart.length} items): <small>₹</small><strong>{getCartTotal(cart)}</strong> </h5>

                    <input type="checkbox" id="gift-box" name="gift-box" value="Gift" />
                    <label htmlFor="gift-box"> This order contains a gift</label>
                    <button type="button" className="buy-btn" onClick={e => navigate("/payment")} >Proceed to buy</button>
                </div>
            </div>
        </div>
    );
}
