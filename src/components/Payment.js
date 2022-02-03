import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
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
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);

    const navigate = useNavigate();


    useEffect(() => {
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
    }, [cart]);

    console.log("The secret is", clientSecret);


    // powerfull hooks 😈
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        // fancy STRIPE stuff

        event.preventDefault();
        setProcessing(true) //usefull to make the button disable while the payment is processing

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                // finds the card details from CardElement in the <form> in the return method.
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent means payment confirmation
            setSucceeded(true)
            setError(null)
            setProcessing(false)

            dispatch({
                type: "EMPTY_CART"
            })
            // navigate("/orders", { replace: true })
            navigate("/", { replace: true })
        })
        console.log(payload);
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
                                    <h6>Subtotal ({cart.length} items): <small>₹</small><strong>{getCartTotal(cart)}</strong> </h6>
                                </div>

                                {/* if error is there, then show it in the div */}
                                {error && <div>{error}</div>}
                            </form>
                        </div>
                    </div>
                </div>
                <div className="side-container">
                    <button disabled={processing || disabled || succeeded}>
                        <span>{processing ? <p>Processing</p> : "Place Your Order and Pay"}</span>
                    </button>
                    <p>You can review this order before it's final.
                    </p>

                </div>
            </div>
        </div >
    );
}
