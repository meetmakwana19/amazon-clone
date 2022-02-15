import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../context/cart-count/CartStateContext';
import themeContext from '../context/theme/ThemeContext';
import "../css/Basket.css"
import CartProduct from './CartProduct';
import SubTotal from './SubTotal';

export default function Basket(props) {

    const { darkMode } = useContext(themeContext);
    const [{ user, filledCart }, dispatch] = useStateValue();
    const navigate = useNavigate();

    useEffect(() => {
        getOrder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getOrder = async () => {
        if (!user) {
            navigate("/signin")
        }
        else {

            props.setProgress(10);

            dispatch({ type: "EMPTY_CART" })
            props.setProgress(20);
            const response = await fetch(`https://amizon-api.herokuapp.com/order/orderedProducts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                },
            });
            props.setProgress(30);

            let parsedObject = await response.json()
            // console.log("parsedObject", parsedObject[1]._id);
            console.log("parsed obj lentgh", parsedObject.length);
            if (parsedObject.length === 0) {
                props.setProgress(100);
            }
            for (let i = 0; i < parsedObject.length; i++) {
                // console.log("Ordered id of user", parsedObject[i]._id);
                const orderId = parsedObject[i]._id
                const id = parsedObject[i].orderedItem
                const url = `https://amizon-api.herokuapp.com/products/${id}`
                let data = await fetch(url);
                let product = await data.json()
                props.setProgress(50);
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
                props.setProgress(100);
            }
        }
    }

    return (
        <div className='basket-component'>
            <div className={darkMode ? "section-left bg-dark" : "section-left"}>
                <h2 id='shopping-h'>Shopping Cart</h2>
                {/* for every single item in cart, return the CartProduct component */}
                {filledCart.length < 1 ? <h4>Empty Cart</h4> :
                    filledCart.map((item, pos) => (
                        <CartProduct {...props}
                            key={pos}
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
