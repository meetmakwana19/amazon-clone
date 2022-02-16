import React, { useContext, useEffect, useState } from 'react'
import "../../css/Mobiles.css"
// import ".../"
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../../context/cart-count/CartStateContext';
import themeContext from '../../context/theme/ThemeContext';
import Spinner from '../Spinner';
import StarRatings from 'react-star-ratings';
import Review from '../Review';
var moment = require('moment-timezone');

function Computers(props) {
    const [data, setData] = useState([])
    const { darkMode } = useContext(themeContext);
    const [loading, setLoading] = useState(false)
    const [{ user, reviewsList }, dispatch] = useStateValue();
    const navigate = useNavigate();

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) //passing an empty array as 2nd argument makes the react know that it needs to be run only once.

    function getProducts() {
        props.setProgress(10);

        // this api data returns a promise and it is handled with "then" on success and "then" will afterwards resolve that promise
        const categoryID = "61ec63dda4fed048d2d9e976"
        fetch(`https://amizon-api.herokuapp.com/categories/${categoryID}/products`).then((result) => {
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

    const getReviews = async (id) => {
        dispatch({ type: "EMPTY_REVIEW" })

        // API Call
        const response = await fetch(`https://amizon-api.herokuapp.com/review/product/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });
        setLoading(true)
        const resp = await response.json();

        for (let i = 0; i < resp.length; i++) {
            // console.log("single review", resp[i].headline);

            var jun = moment(resp[i].createdAt)
            let reviewDate = jun.tz('Asia/Kolkata').format('ddd DD MMMM YYYY');

            const userID = resp[i].user;
            const response2 = await fetch(`https://amizon-api.herokuapp.com/auth/getUsername/${userID}`, {
                method: 'GET',
            });
            const resp2 = await response2.json();
            const userName = resp2.name
            // console.log("resp3 is", userName);

            dispatch({
                type: "FILL_REVIEW",
                item: {
                    _id: resp[i]._id,
                    user: userName,
                    product: resp[i].product,
                    headline: resp[i].headline,
                    rating: resp[i].rating,
                    review: resp[i].review,
                    date: reviewDate
                }
            })

        }
        setLoading(false)
        // console.log("review list is", reviewsList);
    }


    return (
        <>
            <div className="row">
                {data.map((item, pos) => {
                    return (
                        <div className='col-md-4' key={pos}>
                            <div className={darkMode ? "card-item bg-dark border-light text-white" : "card-item"}>
                                <img src={item.productImage} alt="" className='productImage' />
                                <p className="card-item-name">{item.name}</p>
                                <div className="rating">
                                    <StarRatings
                                        rating={item.avgRating}
                                        starDimension="20px"
                                        starSpacing="1px"
                                        starRatedColor="#fea31d" />
                                    {/* <!-- Button trigger modal --> */}
                                    <button type="button" className={darkMode ? "bg-dark p-0 mx-2 mt-n3" : "p-0 mx-2 mt-n3"} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => getReviews(item._id)}>View Reviews</button>
                                </div>

                                <p className="sellPrice">
                                    <small>₹</small>
                                    <p className='sellPrice-p'>{item.sellPrice}</p>
                                    <p className='mrp'>₹{item.mrp}</p>
                                </p>
                                {item.isPrime ? <img id='prime-logo' src="https://seeklogo.com/images/A/amazon-prime-icon-logo-484A50E84F-seeklogo.com.png" width="42" height="12" alt="" /> : null}
                                <button className={darkMode ? "bg-dark" : null} onClick={() => { handleOnAddToCart(item._id) }} type="button">Add to Basket</button>

                                {/* <!-- Modal --> */}
                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog bg-dark">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className={darkMode ? "modal-title text-black" : "modal-title "} id="exampleModalLabel">Customer Reviews</h5>
                                                <button type="button" className="btn-close p-0 m-0" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                {loading && <Spinner />}
                                                {reviewsList.length < 1 ? <h4>No reviews yet</h4> :
                                                    reviewsList.map((item, pos) => (
                                                        <Review
                                                            key={pos}
                                                            _id={item._id}
                                                            user={item.user}
                                                            product={item.product}
                                                            headline={item.headline}
                                                            rating={item.rating}
                                                            review={item.review}
                                                            date={item.date}
                                                        />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </>

    )
}

export default Computers