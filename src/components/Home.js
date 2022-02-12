import React, { useContext, useEffect, useState } from 'react';
import Carousel from './Carousel';
import "../css/Home.css"
import StarRatings from 'react-star-ratings';
import { useStateValue } from '../context/cart-count/CartStateContext';
import { useNavigate } from 'react-router-dom';
import themeContext from '../context/theme/ThemeContext';

export default function Home(props) {
    const [data, setData] = useState([])
    const { darkMode } = useContext(themeContext);

    // state is the global context state
    const [{ user }, dispatch] = useStateValue();

    const navigate = useNavigate();

    // FOR NAV-CART COUNT
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

    const handleOnAddToCart = async (id) => {

        if (!user) {
            navigate("/signin")
        }

        else {
            props.setProgress(10);
            const url = `https://amizon-api.herokuapp.com/products/${id}`
            let data = await fetch(url);
            let oldparsedObject = await data.json()
            props.setProgress(30);

            try {
                props.setProgress(40);
                const response = await fetch(`https://amizon-api.herokuapp.com/order/placeOrder`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem("token")
                    },
                    // sending email, password in the body
                    body: JSON.stringify({
                        orderedItem: oldparsedObject._id,
                        orderItemTotal: oldparsedObject.sellPrice,
                        discount: oldparsedObject.mrp - oldparsedObject.sellPrice,
                        grandTotal: oldparsedObject.sellPrice,
                    }) // body data type must match "Content-Type" header
                });
                console.log("(Don't mind this log) Added product to ordering cart - ", response);
                alert("Product added to cart")
                props.setProgress(60);
                dispatch({
                    type: "EMPTY_CART",
                })
                getAllOrders()
                props.setProgress(100);
            }
            catch (err) {
                console.log("error is", err);
            }
        }
    }

    // An API must be called in useEffect() hook in rfc
    useEffect(() => {
        getProducts(); //this is to call again the function to update the page instantly on delete
        getAddress();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) //passing an empty array as 2nd argument makes the react know that it needs to be run only once.

    // FOR ADDRESS COMPONENT 
    const getAddress = async () => {
        // API Call
        const response = await fetch(`https://amizon-api.herokuapp.com/auth/getUser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });
        const resp = await response.json();
        dispatch({
            type: "SET_ADDRESS",
            address: resp.address
        })
    };


    // FOR HOME PRODUCTS DISPLAY
    function getProducts() {
        props.setProgress(10);

        // this api data returns a promise and it is handled with "then" on success and "then" will afterwards resolve that promise
        fetch("https://amizon-api.herokuapp.com/products").then((result) => {
            props.setProgress(30);
            // even on converting the result, it returns a promise which is to be handles by "then"
            result.json().then((resp) => {
                props.setProgress(60);
                // console.log("Response from API is : " + resp)
                setData(resp)
                props.setProgress(100);
                console.log("Response from API :", resp);
            })
        })
    }

    return (
        <div className='home'>
            <Carousel />
            <div className="sub-home">
                <div className="products">
                    {data.map((item, pos) => {
                        return (
                            <div key={pos}>
                                <div className={darkMode ? "card-item bg-dark border-light text-white" : "card-item"}>
                                    <img src={item.productImage} alt="" className='productImage' />
                                    <p className="card-item-name">{item.name}</p>
                                    <div className="rating">
                                        <StarRatings
                                            rating={item.avgRating}
                                            starDimension="20px"
                                            starSpacing="1px"
                                            starRatedColor="#fea31d" />
                                    </div>
                                    <p className="sellPrice">
                                        <small>₹</small>
                                        <p className='sellPrice-p'>{item.sellPrice}</p>
                                        <p className='mrp'>₹{item.mrp}</p>
                                    </p>
                                    <img id='prime-logo' src="https://seeklogo.com/images/A/amazon-prime-icon-logo-484A50E84F-seeklogo.com.png" width="42" height="12" alt="" />
                                    <button className={darkMode ? "bg-dark" : null} onClick={() => { handleOnAddToCart(item._id) }} type="button">Add to Basket</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
