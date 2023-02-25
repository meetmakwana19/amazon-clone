import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../context/cart-count/CartStateContext';
import themeContext from '../context/theme/ThemeContext';
import '../css/Address.css';

const ROOT_URL = process.env.REACT_APP_ROOT_URL

export default function Address() {

    const { darkMode } = useContext(themeContext);
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
        const response = await fetch(`${ROOT_URL}/auth/updateUser`, {
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
        const response = await fetch(`${ROOT_URL}/auth/getUser`, {
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
            <div className={darkMode ? "card bg-dark text-white" : "card"}>
                <div className="card-header">
                    Your shipping address {user.split(" ")[0]}
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <form action="submit">
                            <div class="col-12">
                                <h5>Current saved address : </h5><p>{address}</p>
                                <h6>Change Address :</h6>
                                <textarea type="text" class={darkMode ? "form-control bg-dark text-white" : "form-control"} id="address" placeholder="1234 Main St" value={credentials.address} onChange={onChange} />
                            </div>
                            <button disabled={credentials.address.length < 1} className='done' onClick={onDone}>Done</button>
                        </form>

                    </blockquote>
                </div>
            </div>
        </div>
    );
}
