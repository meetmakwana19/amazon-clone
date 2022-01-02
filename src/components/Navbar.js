import '../css/Navbar.css'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';

function Navbar() {
    return (
        <>
            <div className='header' style={{ backgroundColor: "#121921", height: "60px", color: "white" }}>

                <div className="nav-left">
                    <div className="div-logo" type="button">
                        <img src="https://www.linkpicture.com/q/amazon-logo.png" alt="" className="app-logo" style={{ width: "100px" }} />
                    </div>
                    <div className="nav-location" type="button">
                        <div className="nav-icon">
                            <FmdGoodOutlinedIcon />
                        </div>
                        <div className="nav-text">
                            <span style={{fontSize:"12px"}}>Hello</span>
                            <span style={{fontSize:"14px"}}className='span-location'>Select your address</span>
                        </div>
                    </div>
                </div>

                <div className="nav-mid">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle dropdown-all" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            All
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" href="#">Alexa Skills</a></li>
                            <li><a className="dropdown-item" href="#">Amazon Fashion</a></li>
                            <li><a className="dropdown-item" href="#">Amazon Fresh</a></li>
                            <li><a className="dropdown-item" href="#">Appliances</a></li>
                            <li><a className="dropdown-item" href="#">Apps & Games</a></li>
                            <li><a className="dropdown-item" href="#">Baby</a></li>
                            <li><a className="dropdown-item" href="#">Beauty</a></li>
                            <li><a className="dropdown-item" href="#">Books</a></li>
                        </ul>
                    </div>
                    <input className='nav-search' type="text" />
                    <SearchIcon type="button" className='searchIcon' style={{ fill: "black" }} />
                </div>

                <div className="nav-right">
                    <div className="country" type="button">
                        <img src="https://i.ibb.co/wWfcTbB/in-square-01.png" alt="" />
                    </div>
                    <div className="lang"></div>
                    <div className="nav-account">
                        <span className='span-h2'>Hello, sign in </span>
                        <span className='span-h1'>Accounts & lists</span>
                    </div>
                    <div className="nav-orders">
                        <span className='span-h2'>Returns</span>
                        <span className='span-h1'>& Orders</span>
                    </div>
                    <div className="nav-cart">
                        <ShoppingCartIcon className='shoppingCartIcon' />
                        <span className='span-cart'>Cart</span>
                    </div>
                </div>

            </div>

            <div className="header-bottom">
                <ul>
                    <li>All</li>
                    <li>Gift Cards</li>
                    <li>Best Sellers</li>
                    <li>Mobiles</li>
                    <li>Customer Care</li>
                    <li>Electronics</li>
                    <li>Today's Deals</li>
                    <li>Fashion</li>
                    <li>Prime</li>
                    <li>Home and Kitchen</li>
                    <li>Amazon Pay</li>
                    <li>New Releases</li>
                    <li>Computers</li>
                    <li>Books</li>
                    <li>Coupons</li>
                    <li>Toys and Games</li>
                    <li>Sell</li>
                </ul>
            </div>
        </>
    )
}

export default Navbar
