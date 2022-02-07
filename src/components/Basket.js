import React, { useContext, useEffect } from 'react';
import { useStateValue } from '../context/cart-count/CartStateContext';
import themeContext from '../context/theme/ThemeContext';
import "../css/Basket.css"
import CartProduct from './CartProduct';
import SubTotal from './SubTotal';

export default function Basket() {

    const { darkMode } = useContext(themeContext);
    const [{ filledCart }, dispatch] = useStateValue();

    useEffect(() => {
        getOrder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getOrder = async () => {
        // console.log("Cart in basket.js is", cart);

        dispatch({ type: "EMPTY_CART" })

        const response = await fetch(`http://localhost:8080/order/orderedProducts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        });

        let parsedObject = await response.json()
        // console.log("parsedObject", parsedObject[1]._id);

        for (let i = 0; i < parsedObject.length; i++) {
            // console.log("Ordered id of user", parsedObject[i]._id);
            const orderId = parsedObject[i]._id
            const id = parsedObject[i].orderedItem
            const url = `http://localhost:8080/products/${id}`
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

    return (
        <div className='basket-component'>
            <div className={darkMode ? "section-left bg-dark" : "section-left"}>
                <h2 id='shopping-h'>Shopping Cart</h2>
                {/* for every single item in cart, return the CartProduct component */}
                {filledCart.map((item, pos) => (
                    <CartProduct key={pos}
                        _id={item._id}
                        productImage={item.productImage_}
                        name={item.name}
                        order_id={item.order_id}
                        currentStock={item.currentStock}
                        sellerName={item.sellerName}
                        deliveryCharge={item.deliveryCharge}
                        sellPrice={item.sellPrice}
                    />
                ))}
            </div>
            <SubTotal />
        </div>
    );
}
