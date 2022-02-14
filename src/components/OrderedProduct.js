import React, { useContext, useRef, useState } from 'react';
import "../css/OrderedProduct.css"
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import { useStateValue } from '../context/cart-count/CartStateContext';
import themeContext from '../context/theme/ThemeContext';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';

import Star from '@mui/icons-material/Star';

export default function OrderedProduct(props) {

    const [{ address }, dispatch] = useStateValue();
    const { darkMode } = useContext(themeContext);
    const [reviews, setReviews] = useState({ rating: "", headline: "", review: "" })
    const navigate = useNavigate();
    const refClose = useRef(null)

    // on Review submit
    const onSubmit = async (e) => {

        // console.log("product id review-", id);
        e.preventDefault()
        props.setProgress(30);
        // API Call
        const response = await fetch(`http://localhost:8080/review/placereview`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({
                product: props.product_id,
                rating: reviews.rating,
                headline: reviews.headline,
                review: reviews.review
            })
        });
        props.setProgress(60);
        const resp = await response.json();
        console.log(resp);
        // console.log("Review posting resp -", resp);
        refClose.current.click();
        props.setProgress(100);
        setReviews({ ...reviews, rating: "", headline: "", review: "" })
        // console.log("reviews is-", reviews);
        document.getElementById("review-form").reset();
    }

    // FOR NAV CART COUNT
    const getAllOrders = async () => {
        dispatch({ type: "EMPTY_CART" })
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

    const handleOnBuy = async () => {
        props.setProgress(30);
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
        props.setProgress(100);
        console.log("(Don't mind this log)-", response);
        alert("Product added to cart")
        getAllOrders()
    }

    const handleOnRemove = async () => {
        console.log("id of order is", props._id);
        const orderID = props._id;
        props.setProgress(30);
        const response = await fetch(`https://amizon-api.herokuapp.com/order/confirmedOrder/${orderID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        });
        props.setProgress(100);
        console.log("(Don't mind this log)-", response);
        alert("Order deleted")
        navigate("/")
        getAllOrders()
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
                            <p className='cartProduct-name'>{props.product_id}</p>
                            <p className='orderProduct-seller'>Sold by {props.sellerName}</p>
                            <div className="d-flex justify-content-between">
                                <button onClick={handleOnBuy} className='buyAgain-btn'><FlipCameraAndroidIcon style={{ fontSize: 'medium' }} /> Buy it again</button>

                                {/* <!-- Button trigger modal --> */}
                                <button type="button" className="btn btn-light px-4" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                                    Write product review
                                </button>

                                {/* <!-- Modal --> */}
                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className={darkMode ? "modal-dialog text-dark" : "modal-dialog"}>
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h3 className="modal-title" id="exampleModalLabel">Create review</h3>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form action='submit' id='review-form'>
                                                    <div className="mb-3">
                                                        <label htmlFor="exampleInputEmail1" className="form-label">Overrall rating <Star style={{ color: "#fed813" }} /><Star style={{ color: "#fed813" }} /><Star style={{ color: "#fed813" }} /><Star style={{ color: "#fed813" }} /><Star style={{ color: "#fed813" }} /> </label>
                                                        <input type="number" step="any" className="form-control" id="rating" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="exampleInputEmail1" className="form-label">Add a headline</label>
                                                        <input type="text" className="form-control" id="headline" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="exampleInputEmail1" className="form-label">Write review</label>
                                                        <textarea className="form-control" id='review'  ></textarea>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                                                <button type="button" className="btn btn-warning" onClick={onSubmit}>Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={handleOnRemove} className='remove-btn mx-2'><DeleteOutlineIcon style={{ fontSize: 'medium' }} />Deprecate Order</button>

                            </div>
                        </div>
                    </blockquote>
                </div>
            </div>
        </div>
    );
}
