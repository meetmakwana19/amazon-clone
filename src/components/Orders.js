import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../context/cart-count/CartStateContext';
import "../css/Orders.css"
import OrderedProduct from './OrderedProduct';
var moment = require('moment-timezone');

export default function Orders(props) {

    const [{ user, orderHistory }, dispatch] = useStateValue();
    const navigate = useNavigate();

    useEffect(() => {
        getOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getOrders = async () => {
        if (!user) {
            navigate("/signin")
        }
        else {
            dispatch({ type: "EMPTY_ORDERS" })
            props.setProgress(10);
            const response = await fetch(`https://amizon-api.herokuapp.com/order/confirmedOrder`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                },
            });
            props.setProgress(30);
            const resp = await response.json();
            // for mapping in newest first form
            const resp1 = resp.reverse();

            const response2 = await fetch(`https://amizon-api.herokuapp.com/auth/getUser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                }
            });
            props.setProgress(50);
            const resp2 = await response2.json();
            // console.log("User details:", resp);
            const userName = resp2.name;

            for (let i = 0; i < resp1.length; i++) {
                const order = resp1[i].order
                // console.log("order productId ids", order);
                // REFERENCE for date formatting - https://momentjs.com/timezone/ 
                var jun = moment(resp1[i].createdAt)
                // console.log(jun.tz('Asia/Kolkata').format('ddd DD MMMM YYYY'));
                let orderDate = jun.tz('Asia/Kolkata').format('ddd DD MMMM YYYY HH:mm');
                // console.log("product date will be", orderDate);
                props.setProgress(70);
                for (let j = 0; j < order.length; j++) {
                    const productId = order[j]
                    // console.log("Product id is", productId);
                    const url = `https://amizon-api.herokuapp.com/products/${productId}`
                    let data = await fetch(url);
                    let product = await data.json()
                    dispatch({
                        type: "FILL_ORDER_HISTORY",
                        item: {
                            _id: resp1[i]._id,
                            product_id: productId,
                            user: userName,
                            productImage_: product.productImage,
                            name: product.name,
                            brandName: product.brandName,
                            sellPrice: product.sellPrice,
                            mrp: product.mrp,
                            avgRating: product.avgRating,
                            sellerName: product.sellerName,
                            deliveryCharge: product.deliveryCharge,
                            date: orderDate
                        }
                    })

                }
            }
            props.setProgress(100);
        }

    }

    return (
        <div className='orders-page'>
            <h2>Your Orders</h2>
            <div className="container">
                {orderHistory.length < 1 ? <h4>No order history</h4> :
                    orderHistory.map((item, pos) => (
                        <OrderedProduct {...props}
                            key={pos}
                            _id={item._id}
                            product_id={item.product_id}
                            user={item.user}
                            productImage={item.productImage_}
                            name={item.name}
                            sellerName={item.sellerName}
                            sellPrice={item.sellPrice}
                            mrp={item.mrp}
                            deliveryCharge={item.deliveryCharge}
                            date={item.date}
                        />
                    ))
                }
            </div>
        </div>
    );
}
