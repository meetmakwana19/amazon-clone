import React from 'react';
import { useStateValue } from '../context/cart-count/CartStateContext';
import "../css/Orders.css"
import CartProduct from './CartProduct';

export default function Orders() {
    const [{ filledCart }] = useStateValue();
    return (
        <div className='orders-page'>
            <h2>Your Orders</h2>

            <div className="container">
                {filledCart.map((item, pos) => (
                    <CartProduct key={pos}
                        order_id={item._order_id}
                        _id={item._id}
                        productImage={item.productImage_}
                        name={item.name}
                        currentStock={item.currentStock}
                        sellerName={item.sellerName}
                        deliveryCharge={item.deliveryCharge}
                        sellPrice={item.sellPrice}
                    />
                ))}
            </div>
        </div>
    );
}
