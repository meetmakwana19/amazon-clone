import React, { useEffect, useState } from 'react';
import Carousel from './Carousel';
import "../css/Home.css"
import StarRatings from 'react-star-ratings';

export default function Home() {
    const [data, setData] = useState([])
    const [image, setImage] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0)

    // An API must be called in useEffect() hook in rfc
    useEffect(() => {
        getProducts() //this is to call again the function to update the page instantly on delete
    }, []) //passing an empty array as 2nd argument makes the react know that it needs to be run only once.

    function getProducts() {
        // this api data returns a promise and it is handled with "then" on success and "then" will afterwards resolve that promise
        fetch("https://fswi-amazon-clone.herokuapp.com/products").then((result) => {
            // even on converting the result, it returns a promise which is to be handles by "then"
            result.json().then((resp) => {
                // console.log("Response from API is : " + resp)
                setData(resp)
                console.log(resp);
                console.log(resp.data.data.productImage);
                setImage(resp.data.data.productImage)
                console.log("setImage is", setImage);
            })
        })
    }

    const handleOnAddToCart = () => {
        setActiveIndex(activeIndex + 1)
    }
    return (
        <div className='home'>
            <Carousel />
            <div className="products">
                {data.map((item, pos) => {
                    return (
                        <div key={pos}>
                            <div className="card-item">
                                <img src={item.productImage} alt="Image file from API" className='productImage' />
                                <p className="card-item-name">{item.name}</p>
                                <p className="brand">{item.brandName}</p>
                                <p className="sellPrice">
                                    <small>₹</small>
                                    <strong>{item.sellPrice}</strong>
                                    <p className='mrp'>₹{item.mrp}</p>
                                </p>
                                <div className="rating">
                                    <StarRatings
                                        rating={item.avgRating}
                                        starDimension="20px"
                                        starSpacing="1px"
                                        starRatedColor="#fea31d" />
                                </div>
                                <img src="https://seeklogo.com/images/A/amazon-prime-icon-logo-484A50E84F-seeklogo.com.png" width="42" height="12" alt="" />
                                <button onClick={handleOnAddToCart} type="button">Add to Basket</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
