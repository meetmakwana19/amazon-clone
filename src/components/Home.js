import React, { useEffect, useState } from 'react';
import Carousel from './Carousel';
import "../css/Home.css"
import StarRatings from 'react-star-ratings';
import { useStateValue } from '../context/cart-count/CartStateContext';

export default function Home() {
    const [data, setData] = useState([])


    // state is the global context state
    const [{ cart }, dispatch] = useStateValue();
    console.log("State is", cart);

    const handleOnAddToCart = async (id) => {
        console.log("Product id is", id);

        const url = `http://localhost:8080/products/${id}`
        let data = await fetch(url);
        let parsedObject = await data.json()
        console.log("Parsed data: ", parsedObject);

        // dispatch the data to the global context
        dispatch({
            type: "ADD_TO_CART",
            item: {
                productImage_: parsedObject.productImage,
                name: parsedObject.name,
                brandName: parsedObject.brandName,
                sellPrice: parsedObject.sellPrice,
                mrp: parsedObject.mrp,
                avgRating: parsedObject.avgRating,
                currentStock: parsedObject.currentStock,
                deliveryCharge: parsedObject.deliveryCharge,
                sellerName: parsedObject.sellerName
            }
        })
    }

    // An API must be called in useEffect() hook in rfc
    useEffect(() => {
        getProducts() //this is to call again the function to update the page instantly on delete
    }, []) //passing an empty array as 2nd argument makes the react know that it needs to be run only once.

    function getProducts() {
        // this api data returns a promise and it is handled with "then" on success and "then" will afterwards resolve that promise
        fetch("http://localhost:8080/products").then((result) => {
            // even on converting the result, it returns a promise which is to be handles by "then"
            result.json().then((resp) => {
                // console.log("Response from API is : " + resp)
                setData(resp)
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
                                <div className="card-item">
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
                                    <button onClick={() => { handleOnAddToCart(item._id) }} type="button">Add to Basket</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
