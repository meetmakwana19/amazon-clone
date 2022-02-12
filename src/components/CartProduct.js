import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../context/cart-count/CartStateContext';
import "../css/CartProduct.css"

export default function CartProduct(props) {

    const [{ user }, dispatch] = useStateValue();
    console.log("user is", user);
    const navigate = useNavigate();

    const deleteCartItem = async () => {
        props.setProgress(10);
        const orderID = props.order_id
        try {
            console.log("deleting order", orderID);
        } catch (error) {
            console.log("cannot order id", error);
        }
        console.log("deleting item", props._id);
        props.setProgress(30);
        const response = await fetch(`https://amizon-api.herokuapp.com/order/${orderID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });
        props.setProgress(100);
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
        getAllOrders();
    }

    // FOR NAV CART COUNT
    const getAllOrders = async () => {
        const response = await fetch(`https://amizon-api.herokuapp.com/order/orderedProducts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        });

        let parsedObject = await response.json()

        for (let i = 0; i < parsedObject.length; i++) {
            const orderId = parsedObject[i]._id
            const id = parsedObject[i].orderedItem
            const url = `https://amizon-api.herokuapp.com/products/${id}`
            let data = await fetch(url);
            let product = await data.json()
            dispatch({
                type: "FILL_TO_CART",
                item: {
                    order_id: orderId,
                    _id: product._id,
                    productImage_: product.productImage,
                    name: product.name,
                    brandName: product.brandName,
                    sellPrice: product.sellPrice,
                    mrp: product.mrp,
                    avgRating: product.avgRating,
                    currentStock: product.currentStock,
                    deliveryCharge: product.deliveryCharge,
                    sellerName: product.sellerName
                }
            })
        }
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
