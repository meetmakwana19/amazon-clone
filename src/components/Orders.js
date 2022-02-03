import React, { useEffect, useState } from 'react';
import "../css/Orders.css"

export default function Orders() {

    const [history, setHistory] = useState(null);

    useEffect(() => {
        getOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getOrders = async () => {
        const response = await fetch(`http://localhost:8080/order/confirmedOrder`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        });
        const resp = await response.json();
        console.log("Your order history:", resp);
        setHistory(JSON.stringify(resp))
        console.log("histroy is", history);
    }

    return (
        <div className='orders-page'>
            <h2>Your Orders</h2>
            <div className="container">
                {/* <input type="text" value={history} /> */}
                {history}
            </div>
        </div>
    );
}
