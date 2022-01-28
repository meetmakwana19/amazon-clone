import React from 'react';
import { useStateValue } from '../context/cart-count/CartStateContext';
import "../css/CartProduct.css"

export default function CartProduct(props) {

    const [{ cart }, dispatch] = useStateValue();

    const deleteCartItem = () => {
        dispatch({
            type: "DELETE_FROM_CART",
            dispatched_id: props.id
        })
    }
    return (
        <div className="cartProduct">
            <img src={props.productImage} alt="" className="cartProduct-img" />
            <div className="cartProduct-info">
                <h4 className='cartProduct-h'>{props.name}</h4>
                <p className='cartProduct-stock'>In stock {props.currentStock}</p>
                <p className='cartProduct-seller'>Sold by {props.sellerName}</p>
                <p className='cartProduct-delivery'>Free delivery {props.deliveryCharge}</p>
                <p className='delete-btn' type="button" onClick={deleteCartItem}>Delete</p>
            </div>
            <div className="price">
                <small>₹</small><strong>{props.sellPrice}</strong>
            </div>
        </div>
    );
}
