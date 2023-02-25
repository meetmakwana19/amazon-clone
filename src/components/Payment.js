import { CardElement } from '@stripe/react-stripe-js';
import React from 'react';
import { useStateValue } from '../context/cart-count/CartStateContext';
import '../css/Payment.css'
import CartProduct from './CartProduct';
import { useState } from 'react';
import { getCartTotal } from '../state/reducers/reducer';
import { useNavigate } from 'react-router-dom';

const ROOT_URL = process.env.REACT_APP_ROOT_URL

export default function Payment(props) {

    const [{ cart, filledCart, user, address }, dispatch] = useStateValue();
    console.log("filled cart-", filledCart);
    var arr = [];
    for (let i = 0; i < filledCart.length; i++) {
        // const orderId = filledCart[i]._id
        console.log("filled cart product ids-", filledCart[i]._id);
        arr.push(filledCart[i]._id)
    }
    console.log("array is", arr);

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    console.log(disabled);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!address) {
            alert("PLease add your shipping address before placing the order")
            navigate("/address")
        }
        else {

            try {
                props.setProgress(30);
                const response = await fetch(`${ROOT_URL}/order/confirmOrder`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem("token")
                    },
                    body: JSON.stringify({
                        order: arr,
                        paidAmount: getCartTotal(filledCart),
                        shippingAddress: address,
                    })
                });
                props.setProgress(60);
                console.log("saving order", response._id);
            }
            catch (err) {
                console.log("error is", err);
            }
            dispatch({
                type: "EMPTY_CART"
            })
            alert("Order Placed")
            navigate("/", { replace: true })
            props.setProgress(100);
            emptyCart();
        }
    }

    const emptyCart = async () => {
        for (let i = 0; i < filledCart.length; i++) {
            const orderId = filledCart[i].order_id
            console.log("filledcart ids", orderId);
            const response = await fetch(`${ROOT_URL}/order/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                },
            });
            console.log(response);
        }
    }

    const handleChange = (event) => {

        // if the event field(input) is empty then disable it 
        setDisabled(event.empty);

        // show error
        setError(event.error ? event.error.message : '');
    }

    const handleCheckOut = () => {
        navigate("/basket")
    }

    return (
        <div className='payment-page'>
            <div>
                <img style={{ border: "2px solid orange", padding: "4px" }} src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/payselect/progressbar-payments._CB485947677_.gif" alt="" srcSet="" />
            </div>


            <span onClick={handleCheckOut}>
                ◀ Go back to cart ({cart?.length} items)
            </span>

            <h2>Select Payment method</h2>

            <div className="payment-divs">
                <div className="container">
                    <div className="section">
                        <h4 className='section-title'>Delivery address</h4>
                        <div className="section-content">
                            <p>{user}</p>
                            <p className='p-address'>{address ? address : <b className="text-danger">PLease add your shipping address before placing the order</b>}</p>
                        </div>
                    </div>

                    <div className="section">
                        <h4 className='section-title'>Review your order</h4>
                        <div className="section-content">
                            {filledCart.map((item, pos) => (
                                <CartProduct key={pos}
                                    order_id={item._order_id}
                                    _id={item._id}
                                    productImage={item.productImage_}
                                    name={item.name}
                                    currentStock={item.currentStock}
                                    sellerName={item.sellerName}
                                    deliveryCharge={item.deliveryCharge}
                                    sellPrice={item.sellPrice}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="section">
                        <h4 className='section-title'>Payment Method</h4>
                        <div className="section-content">
                            <h6>Payment Details</h6>
                            <form onSubmit={handleSubmit}>
                                <CardElement className='text-white' onChange={handleChange} />
                                <div className="pricing">
                                </div>

                                {/* if error is there, then show it in the div */}
                                {error && <div>{error}</div>}
                            </form>
                        </div>
                    </div>
                </div>
                <div className="side-container">
                    <h6>Grand total ({filledCart.length} items): <small>₹</small><strong>{getCartTotal(filledCart)}</strong> </h6>

                    {/* <button onClick={handleSubmit} disabled={processing || disabled || succeeded}> */}
                    <button onClick={handleSubmit}>
                        {/* <span>{processing ? <p>Processing</p> : "Place Your Order and Pay"}</span> */}
                        <span>Place Your Order and Pay</span>
                    </button>
                    {/* <p>You can review this order before it's final.</p> */}

                </div>
            </div>
        </div >
    );
}
