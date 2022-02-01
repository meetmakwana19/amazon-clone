import React from 'react';
import { useStateValue } from '../context/cart-count/CartStateContext';
import "../css/Basket.css"
import CartProduct from './CartProduct';
import SubTotal from './SubTotal';

export default function Basket() {

    const [{ cart }] = useStateValue();

    return (
        <div className='basket-component'>
            <div className="section-left">
                <h2>Shopping Cart</h2>
                <hr />

                {/* for every single item in cart, return the CartProduct component */}
                {cart.map((item, pos) => (
                    <CartProduct key={pos}
                        id={item._id}
                        productImage={item.productImage_}
                        name={item.name}
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
