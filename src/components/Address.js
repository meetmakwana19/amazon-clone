import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../context/cart-count/CartStateContext';
import '../css/Address.css';

export default function Address() {

    const [{ user, address }, dispatch] = useStateValue();
    const [credentials, setCredentials] = useState({ address: "" })
    const [presentAddr, setPresentAddr] = useState("");
    let navigate = useNavigate()
    console.log(presentAddr);

    useEffect(() => {
        getAddress();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value })
    }

    const onDone = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:8080/auth/updateUser`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            // sending email, password in the body
            body: JSON.stringify({ address: credentials.address }) // body data type must match "Content-Type" header
        });
        alert("Added address successfully")
        navigate("/")
        console.log(response);
    }

    const getAddress = async () => {
        // API Call
        const response = await fetch(`http://localhost:8080/auth/getUser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });
        const resp = await response.json();
        setPresentAddr(resp.address);
        dispatch({
            type: "SET_ADDRESS",
            address: resp.address
        })
    };

    return (
        <div className='address-div'>
            <div className="card">
                <div className="card-header">
                    Your shipping address {user.split(" ")[0]}
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <form action="submit">
                            <div class="col-12">
                                <h5>Current saved address : </h5><p>{address}</p>
                                <h6>Change Address :</h6>
                                <textarea type="text" class="form-control" id="address" placeholder="1234 Main St" value={credentials.address} onChange={onChange} />
                            </div>
                            <button disabled={credentials.address.length < 1} className='done' onClick={onDone}>Done</button>
                        </form>

                    </blockquote>
                </div>
            </div>
        </div>
    );
}
