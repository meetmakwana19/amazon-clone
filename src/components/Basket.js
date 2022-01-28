import React from 'react';
import { useStateValue } from '../context/cart-count/CartStateContext';
import "../css/Basket.css"
import CartProduct from './CartProduct';
import SubTotal from './SubTotal';

export default function Basket() {

    const [{ cart }, dispatch] = useStateValue();

    return (
        <div className='basket-component'>
            <div className="section-left">
                <h2>Shopping Cart</h2>
                <hr />

                {/* for every single item in cart, return the CartProduct component */}
                {cart.map(item => (
                    <CartProduct
                        id={item._id}
                        // productImage="https://m.media-amazon.com/images/I/7162Y5fPdkL._SL1500_.jpg"
                        productImage={item.productImage_}
                        name={item.name}
                        currentStock={item.currentStock}
                        sellerName={item.sellerName}
                        deliveryCharge={item.deliveryCharge}
                        sellPrice={item.sellPrice}
                    // id={item._id}
                    // id={item._id}
                    // name={item.name}
                    // description={item.description}
                    // sellerName={item.sellerName}
                    // deliveryCharge={item.deliveryCharge}
                    />
                ))}
            </div>
            <SubTotal />
        </div>
    );
}
