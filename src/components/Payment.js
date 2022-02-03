// import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import React from 'react';
import { useStateValue } from '../context/cart-count/CartStateContext';
import '../css/Payment.css'
import CartProduct from './CartProduct';
import { useState, useEffect } from 'react';
import { getCartTotal } from '../state/reducers/reducer';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

export default function Payment() {

    const [{ cart, filledCart, user, address }, dispatch] = useStateValue();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    // const [succeeded, setSucceeded] = useState(false);
    // const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);
    console.log(disabled);

    const navigate = useNavigate();


    useEffect(() => {
        // console.log("fill cart ", JSON.stringify(filledCart));

        // generate  a special stripe secret allowing to charge an user correctly whenever the cart changes.

        const getClientSecret = async () => {
            const resp = await axios({
                method: "post",
                url: `/payments/create?total=${getCartTotal(cart) * 100}`
                // stripe takes lowest denomination no matter what currency type, so for 1 rupee=100paise i.e stripe will do transaction in paise so converted a rupee into paise by *100
            });
            setClientSecret(resp.data.clientSecret)
        }
        getClientSecret();
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [cart]);

    console.log("The secret is", clientSecret);


    // powerfull hooks 😈
    // const stripe = useStripe();
    // const elements = useElements();

    const handleSubmit = async (event) => {
        // fancy STRIPE stuff

        event.preventDefault();
        // setProcessing(true) //usefull to make the button disable while the payment is processing

        console.log("handling order final");
        // const payload = await stripe.confirmCardPayment(clientSecret, {
        //     payment_method: {
        //         // finds the card details from CardElement in the <form> in the return method.
        //         card: elements.getElement(CardElement)
        //     }
        // }).then(({ paymentIntent }) => {
        //     // paymentIntent means payment confirmation
        //     setSucceeded(true)
        //     setError(null)
        //     setProcessing(false)

        //     dispatch({
        //         type: "EMPTY_CART"
        //     })
        //     // navigate("/orders", { replace: true })
        //     navigate("/", { replace: true })
        // })
        // console.log(payload);

        try {
            const response = await fetch(`http://localhost:8080/auth/getUser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                }
            });
            const resp = await response.json();
            console.log("User details:", resp);
            const userID = resp._id;
            console.log("userName is", userID);

            try {
                const response = await fetch(`http://localhost:8080/order/confirmOrder`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem("token")
                    },
                    // sending email, password in the body
                    body: JSON.stringify({
                        user: userID,
                        order: JSON.stringify(filledCart),
                        paidAmount: getCartTotal(filledCart),
                    }) // body data type must match "Content-Type" header
                });
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
            emptyCart();
        }
        catch (err) {
            console.log("error for placing order is", err);
        }
    }

    const emptyCart = async () => {
        for (let i = 0; i < filledCart.length; i++) {
            const orderId = filledCart[i].order_id
            console.log("filledcart ids", orderId);
            const response = await fetch(`http://localhost:8080/order/${orderId}`, {
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
                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/payselect/progressbar-payments._CB485947677_.gif" alt="" srcSet="" />
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
                            <p className='p-address'>{address}</p>
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
                                <CardElement onChange={handleChange} />
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
