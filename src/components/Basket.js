import React from 'react';
import "../css/Basket.css"
import SubTotal from './SubTotal';

export default function Basket() {
    return (
        <div className='basket-component'>
            <div className="section-left">
                <h2>Shopping Cart</h2>
                <hr />
            </div>
            <SubTotal />
        </div>
    );
}
