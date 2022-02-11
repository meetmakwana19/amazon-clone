import React, { useContext } from 'react';
import "../css/OrderedProduct.css"
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import { useStateValue } from '../context/cart-count/CartStateContext';
import themeContext from '../context/theme/ThemeContext';

export default function OrderedProduct(props) {

    const [{ address }] = useStateValue();
    const { darkMode } = useContext(themeContext);

    const handleOnBuy = async () => {
        const response = await fetch(`https://amizon-api.herokuapp.com/order/placeOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({
                orderedItem: props.product_id,
                orderItemTotal: props.sellPrice,
                discount: props.mrp - props.sellPrice,
                shippingAddress: address,
                grandTotal: props.sellPrice,
            }) // body data type must match "Content-Type" header
        });
        console.log(response);
        alert("Product added to cart")

    }
    return (
        <div className="cartProduct">
            <div className={darkMode ? "card bg-dark text-white" : "card"}>
                <div className={darkMode ? "card-header-dark card-header" : "card-header"}>
                    <div className="placed">
                        ORDER PLACED
                        <div className={darkMode ? "content-dark" : "content"}>{props.date}</div>
                    </div>
                    <div className="total">
                        TOTAL
                        <div className={darkMode ? "content-dark" : "content"}>₹{props.sellPrice}
                        </div>
                    </div>
                    <div className="shipTo">
                        SHIP TO
                        <div className={darkMode ? "content-dark" : "content"}>{props.user}</div>
                        <small>{address}</small>
                    </div>
                    <div className="order-id">
                        ORDER ID
                        <div className={darkMode ? "content-dark" : "content"}>{props._id}</div>
                    </div>
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <img src={props.productImage} alt="" className="cartProduct-image" />
                        <div className="order-div-mid">
                            <p className='cartProduct-name'>{props.name}</p>
                            <p className='orderProduct-seller'>Sold by {props.sellerName}</p>
                            <button onClick={handleOnBuy} className='buyAgain-btn'><FlipCameraAndroidIcon style={{ fontSize: 'medium' }} /> Buy it again</button>
                        </div>
                    </blockquote>
                </div>
            </div>
        </div>
    );
}
