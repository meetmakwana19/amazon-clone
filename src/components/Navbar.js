import '../css/Navbar.css'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {

    const navFunc = () =>{
        console.log("Here");
    }
    return (
        <>
            <div className='header' style={{ backgroundColor: "#121921", height: "3.75rem", color: "white" }}>

                <div className="nav-left">
                    <div className="div-logo" type="button">
                        <img src="https://www.linkpicture.com/q/amazon-logo.png" alt="" className="app-logo" style={{ width: "6.25rem" }} />
                    </div>
                    <div className="nav-location" type="button">
                        <div className="nav-icon">
                            <FmdGoodOutlinedIcon />
                        </div>
                        <div className="nav-text">
                            <span style={{fontSize:"0.75rem"}}>Hello</span>
                            <span style={{fontSize:"0.875rem"}}className='span-location'>Select your address</span>
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
                    <input onClick={navFunc()} className='nav-search' type="text" />
                    <SearchIcon type="button" className='searchIcon' style={{ fill: "black" }} />
                </div>

                <div className="nav-right">
                    <div className="country" type="button">
                        <img src="https://i.ibb.co/wWfcTbB/in-square-01.png" alt="" />
                        <ArrowDropDownOutlinedIcon className='country-arrow'/>
                    </div>
                    <div className="nav-account" type="button">
                        <span className='span-h2'>Hello, sign in </span>
                        <span className='span-h1'>Accounts & lists</span>
                        <ArrowDropDownOutlinedIcon className='account-arrow'/>
                    </div>
                    <div className="nav-orders" type="button">
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
                    <li type="button"><MenuIcon className='menu-icon'/> All</li>
                    <li type="button">Gift Cards</li>
                    <li type="button">Best Sellers</li>
                    <li type="button">Mobiles</li>
                    <li type="button">Customer Care</li>
                    <li type="button">Electronics</li>
                    <li type="button">Today's Deals</li>
                    <li type="button">Fashion</li>
                    <li type="button">Prime</li>
                    <li type="button">Home and Kitchen</li>
                    <li type="button">Amazon Pay</li>
                    <li type="button">New Releases</li>
                    <li type="button">Computers</li>
                    <li type="button">Books</li>
                    <li type="button">Coupons</li>
                    <li type="button">Toys and Games</li>
                    <li type="button">Sell</li>
                </ul>
            </div>
        </>
    )
}

export default Navbar
