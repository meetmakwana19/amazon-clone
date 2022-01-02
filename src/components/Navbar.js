import '../css/Navbar.css'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Navbar() {
    return (
        <>
        <div className='header' style={{backgroundColor:"#121921", height:"60px", color:"white"}}>

            <div className="nav-left">
                <img src="https://www.linkpicture.com/q/amazon-logo.png" alt="" className="app-logo" style={{width:"100px"}} />
                <div className="nav-location">
                    <span>Hello</span>
                    <span className='span-location'>Select your address</span>
                </div>
            </div>

            <div className="nav-mid">
                <input className='nav-search' type="text" />
                <SearchIcon type="button" className='searchIcon' style={{fill: "black"}}/>
            </div>

            <div className="nav-right">
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
                    <ShoppingCartIcon className='shoppingCartIcon'/>
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
