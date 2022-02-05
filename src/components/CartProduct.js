import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../context/cart-count/CartStateContext';
import "../css/CartProduct.css"

export default function CartProduct(props) {

    const [{ user }, dispatch] = useStateValue();
    console.log("user is", user);
    const navigate = useNavigate();

    const deleteCartItem = async () => {
        const orderID = props.order_id
        try {
            console.log("deleting order", orderID);
        } catch (error) {
            console.log("cannot order id", error);
        }
        console.log("deleting item", props._id);

        const response = await fetch(`http://localhost:8080/order/${orderID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });
        console.log(response);
        dispatch({
            type: "DELETE_FROM_CART",
            dispatched_id: props._id
        })
        alert("Deleted item successfully")
        navigate("/")
        dispatch({
            type: "EMPTY_CART"
        })
    }
    return (
        <div className="cartProduct">
            <img src={props.productImage} alt="" className="cartProduct-img" />
            <div className="cartProduct-info">
                <h4 className='cartProduct-h'>{props.name}</h4>
                <p className='cartProduct-stock'>In stock ({props.currentStock}units)</p>
                <p className='cartProduct-seller'>Sold by {props.sellerName}</p>
                <p className='cartProduct-delivery'>Delivery charges - Rs {props.deliveryCharge}</p>
                <p className='delete-btn' type="button" onClick={deleteCartItem}>Delete</p>
            </div>
            <div className="price">
                <small>₹</small><strong>{props.sellPrice}</strong>
            </div>
        </div>
    );
}
