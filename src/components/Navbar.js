import '../css/Navbar.css'
import React, { useContext, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom'
import { useStateValue } from '../context/cart-count/CartStateContext';
import ThemeBtn from './ThemeBtn';
import themeContext from '../context/theme/ThemeContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ROOT_URL = process.env.REACT_APP_ROOT_URL

function Navbar(props) {
    const { darkMode } = useContext(themeContext);
    const [{ user, filledCart }, dispatch] = useStateValue();
    const navigate = useNavigate();

    const navFunc = () => {
        console.log("Here");
    }

    const [data, setData] = useState([])
    // An API must be called in useEffect() hook in rfc
    useEffect(() => {
        getCategories() //this is to call again the function to update the page instantly on delete
        getOrder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) //passing an empty array as 2nd argument makes the react know that it needs to be run only once.

    function getCategories() {
        props.setProgress(10);

        // this api data returns a promise and it is handled with "then" on success and "then" will afterwards resolve that promise
        fetch(`${ROOT_URL}/categories`).then((result) => {
            props.setProgress(30);

            // even on converting the result, it returns a promise which is to be handles by "then"
            result.json().then((resp) => {
                props.setProgress(60);
                // console.log("Response from API is : " + resp)
                setData(resp)
                props.setProgress(100);
            })
        })
    }
    const getOrder = async () => {
        props.setProgress(10);

        // console.log("Cart in basket.js is", cart);

        const response = await fetch(`${ROOT_URL}/order / orderedProducts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        });
        props.setProgress(30);

        let parsedObject = await response.json()
        // console.log("parsedObject", parsedObject[1]._id);

        for (let i = 0; i < parsedObject.length; i++) {
            // console.log("Ordered id of user", parsedObject[i]._id);
            const orderId = parsedObject[i]._id
            const id = parsedObject[i].orderedItem
            const url = `${ROOT_URL}/products/${id}`
            let data = await fetch(url);
            let product = await data.json()
            props.setProgress(60);
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
        props.setProgress(100);
    }


    const signOut = async () => {
        props.setProgress(10);
        const response = await fetch(`${ROOT_URL}/auth / logout`, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem("token")
            },
        });
        props.setProgress(30);
        const resp = await response.json();
        console.log(resp);
        // console.log("auth token:", localStorage.getItem("token"));
        localStorage.removeItem("token");
        props.setProgress(60);
        dispatch({
            type: "SET_USER",
            user: "",
        })
        dispatch({
            type: "SET_ADDRESS",
            address: "",
        })
        dispatch({
            type: "EMPTY_CART",
        })
        console.log("auth token after sign out:", localStorage.getItem("token"));

        getCategories();
        props.setProgress(100);
    }

    const getAllOrders = async () => {
        const response = await fetch(`${ROOT_URL}/order / orderedProducts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        });

        let parsedObject = await response.json()
        for (let i = 0; i < parsedObject.length; i++) {
            const orderId = parsedObject[i]._id
            const id = parsedObject[i].orderedItem
            const url = `${ROOT_URL}/products / ${id}`
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

    const handleOnHome = () => {
        props.setProgress(40);
        dispatch({
            type: "EMPTY_CART",
        })
        getAllOrders()
        props.setProgress(100);
    }

    const handleAddress = () => {
        if (!user) {
            navigate("/signin")
        }
        else {
            navigate("/address")
            props.setProgress(100);
        }
    }

    const handleOnMobile = () => {
        navigate("/mobiles")
    }
    const handleOnComputers = () => {
        navigate("/computers")
    }
    const handleOnMensFashion = () => {
        navigate("/mensFashion")
    }
    const handleOnWomensFashion = () => {
        navigate("/womensFashion")
    }
    const handleOnAppliances = () => {
        navigate("/appliances")
    }
    const handleOnToysGames = () => {
        navigate("/toysAndGames")
    }
    const handleOnLi = () => {
        props.setProgress(40);
        navigate("/categories")
        props.setProgress(100);
    }

    return (
        <>
            <div className='header navbar ' style={{ backgroundColor: "#121921", height: "3.75rem", color: "white" }}>

                <div className="nav-left">
                    <Link to="/" className="div-logo" type="button" onClick={handleOnHome}>
                        <img src="https://www.pinclipart.com/picdir/big/57-576184_view-our-amazon-storefront-amazon-logo-white-png.png" alt="" className="app-logo" style={{ width: "6.25rem" }} />
                    </Link>
                    <div className="nav-location" type="button" onClick={handleAddress}>
                        <div className="nav-icon">
                            <FmdGoodOutlinedIcon />
                        </div>
                        <div className="nav-text">
                            <span style={{ fontSize: "0.75rem" }}>Deliver to {user ? user : "Guest"}</span>
                            <span style={{ fontSize: "0.875rem" }} className='span-location'>Select your address</span>
                        </div>
                    </div>
                </div>

                <div className="nav-mid">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle dropdown-all text-center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            All
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" href="/">Alexa Skills</a></li>
                            <li><a className="dropdown-item" href="/">Amazon Fashion</a></li>
                            <li><a className="dropdown-item" href="/">Amazon Fresh</a></li>
                            <li><a className="dropdown-item" href="/">Appliances</a></li>
                            <li><a className="dropdown-item" href="/">Apps & Games</a></li>
                            <li><a className="dropdown-item" href="/">Baby</a></li>
                            <li><a className="dropdown-item" href="/">Beauty</a></li>
                            <li><a className="dropdown-item" href="/">Books</a></li>
                        </ul>
                    </div>
                    <input className={darkMode ? "nav-search-dark" : 'nav-search'} type="text" />
                    <SearchIcon onClick={navFunc} type="button" className='searchIcon' style={{ fill: "black" }} />
                </div>

                <div className="nav-right">
                    <div className="country" type="button">
                        <img src="https://i.ibb.co/wWfcTbB/in-square-01.png" alt="" />
                        <ArrowDropDownOutlinedIcon className='country-arrow' />
                    </div>
                    <Link to="/signin" className="nav-account" type="button">
                        <span className='span-h2'>Hello, {user ? user.split(" ")[0] : "Sign in"}</span>
                        <span className='span-h1'>Accounts & lists</span>
                        <ArrowDropDownOutlinedIcon className='account-arrow' />
                    </Link>
                    <Link to="/orders" className="nav-orders" type="button">
                        <span className='span-h2'>Returns</span>
                        <span className='span-h1'>& Orders</span>
                    </Link>
                    <Link className="nav-cart" to="/basket">
                        <ShoppingCartIcon className='shoppingCartIcon' />
                        <span className='span-cart'>Cart</span>
                        <span className='cart-count'>{filledCart?.length}</span>
                    </Link>
                </div>
                <div className="header-bottom">
                    <ul>
                        <li type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"><MenuIcon className='menu-icon' /> All</li>

                        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                            <div className="offcanvas-header" style={{ backgroundColor: "#232f3f" }}>
                                <h5 className="offcanvas-title" id="offcanvasExampleLabel"><AccountCircleIcon style={{ fontSize: 'xx-large', color: "" }} /> Hello, {user ? user.split(" ")[0] : "Guest"}</h5>
                                <button type="button" className="btn-close text-reset btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className={darkMode ? "offcanvas-body text-black p-0 bg-dark text-white " : "offcanvas-body text-black p-0"} id='offcanvas-items'>
                                <div>
                                    <h4 style={{ padding: "0 30px", paddingTop: "30px" }}><b>Shop by department</b></h4>
                                    <ul id={darkMode ? 'offcanvas-items-ul-dark' : 'offcanvas-items-ul'}>
                                        <li type="button" onClick={handleOnMobile}>Mobiles</li>
                                        <li type="button" onClick={handleOnComputers}>Computers</li>
                                        <li type="button" onClick={handleOnAppliances}>Home Appliances</li>
                                        <li type="button" onClick={handleOnMensFashion}>Men's Fashion</li>
                                        <li type="button" onClick={handleOnWomensFashion}>Women's Fashion</li>
                                        <li type="button" onClick={handleOnToysGames}>Toys & Games</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 style={{ padding: "0 30px", paddingTop: "30px" }}><b>Help</b></h4>
                                    <ul id={darkMode ? 'offcanvas-items-ul-dark' : 'offcanvas-items-ul'}>
                                        <li type="button"><a target="_blank" rel="noreferrer" href="https://www.amazon.in/gp/help/customer/display.html?nodeId=508510&ref_=nav_em_cs_help_0_1_1_31" style={{ textDecoration: "none" }} className={darkMode ? "text-white" : "text-black"}>Customer Service</a></li>
                                        {localStorage.getItem("token") ? <li type="button" onClick={signOut}>Sign Out</li> : ""}

                                    </ul>
                                </div>
                            </div>
                        </div>
                        {data.map((item, pos) => {
                            return (
                                <div key={pos}>
                                    <li onClick={handleOnLi} type="button">{item.name}</li>
                                </div>
                            )
                        })}
                        <li type="button"><ThemeBtn /></li>
                        {localStorage.getItem("token") ? <li type="button" onClick={signOut}>SignOut</li> : ""}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar
