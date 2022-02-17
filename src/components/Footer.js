import React from 'react'
import "../css/Footer.css"
import { Link } from 'react-router-dom'


function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    return (
        <div>
            <footer className='app-footer text-center'>
                <div className="footer1 p-2 pb-0" onClick={scrollToTop}>
                    Back to top
                </div>
                <div className="footer2 p-5">
                    <div className="f2-cols">
                        <div className="col-lg-3 col-md-6 mr-5 mb-4 mb-md-0">
                            <span className="  mb-4">Get to know us</  span>

                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="#!"  >About Us</a>
                                </li>
                                <li>
                                    <a href="#!"  >Careers</a>
                                </li>
                                <li>
                                    <a href="#!"  >Press Releases</a>
                                </li>
                                <li>
                                    <a href="#!"  >Amazon Cares</a>
                                </li>
                                <li>
                                    <a href="#!"  >Gift a Smile</a>
                                </li>
                                <li>
                                    <a href="#!"  >Amazon Science</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 mr-5 mb-4 mb-md-0">
                            <span className="  mb-0">Connect with us</  span>

                            <ul className="list-unstyled">
                                <li>
                                    <a href="#!"  >Facebook</a>
                                </li>
                                <li>
                                    <a href="#!"  >Twitter</a>
                                </li>
                                <li>
                                    <a href="#!"  >Instagram</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 mr-5 mb-4 mb-md-0">
                            <span className="  mb-0">Make Money with Us</  span>

                            <ul className="list-unstyled">
                                <li>
                                    <a href="#!"  >Sell on Amazon</a>
                                </li>
                                <li>
                                    <a href="#!"  >Sell under Amazon Accelerator</a>
                                </li>
                                <li>
                                    <a href="#!"  >Amazon Global Selling</a>
                                </li>
                                <li>
                                    <a href="#!"  >Become an Affiliate</a>
                                </li>
                                <li>
                                    <a href="#!"  >Fulfilment by Amazon</a>
                                </li>
                                <li>
                                    <a href="#!"  >Advertise Your Products</a>
                                </li>
                                <li>
                                    <a href="#!"  >Amazon Pay on Merchants</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 mx-5 mb-4 mb-md-0">
                            <span className="  mb-0">Let Us Help You</  span>

                            <ul className="list-unstyled">
                                <li>
                                    <a href="#!"  >Covid 19 and Amazon</a>
                                </li>
                                <li>
                                    <a href="#!"  >Your Account</a>
                                </li>
                                <li>
                                    <a href="#!"  >Returns Center</a>
                                </li>
                                <li>
                                    <a href="#!"  >100% Purchase Protection</a>
                                </li>
                                <li>
                                    <a href="#!"  >Amazon App Download</a>
                                </li>
                                <li>
                                    <a href="#!"  >Amazon Assistant Download</a>
                                </li>
                                <li>
                                    <a href="#!"  >Help</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div className="d-flex flex-column ">
                        <Link to="/" className="m-3" type="button" >
                            <img src="https://www.pinclipart.com/picdir/big/57-576184_view-our-amazon-storefront-amazon-logo-white-png.png" alt="" className="app-logo " style={{ width: "6.25rem", margin: "auto" }} />
                        </Link>
                        <section className='s-containerr mx-auto'>
                            <a href="#!">Australia</a>
                            <a href="#!">Brazil</a>
                            <a href="#!">Canada</a>
                            <a href="#!">China</a>
                            <a href="#!">France</a>
                            <a href="#!">Germany</a>
                            <a href="#!">Italy</a>
                            <a href="#!">Japan</a>
                            <a href="#!">Mexico</a>
                            <a href="#!">Netherlands</a>
                            <a href="#!">Poland</a>
                            <a href="#!">Singapore</a>
                            <a href="#!">Spain</a>
                            <a href="#!">Turkey</a>
                            <a href="#!">United Arab Emirates</a>
                            <a href="#!">United Kingdom</a>
                            <a href="#!">United States</a>
                        </section>
                    </div>
                </div>
                <div className="footer3 p-5">
                    <div className="f3-cols">
                        <div className="col-lg-3 col-md-3 mb-4 mb-md-0">
                            <span className="  mb-4">Abe Books</  span>

                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="#!"  >Books, art</a>
                                </li>
                                <li>
                                    <a href="#!"  >& collectibles</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-2 mb-4 mb-md-0">
                            <span className="  mb-0">Amazon Web Services</  span>

                            <ul className="list-unstyled">
                                <li>
                                    <a href="#!"  >Scalable Cloud</a>
                                </li>
                                <li>
                                    <a href="#!"  >Computing Services</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-2 mb-4 mb-md-0">
                            <span className="  mb-0">Audible</  span>

                            <ul className="list-unstyled">
                                <li>
                                    <a href="#!"  >Download</a>
                                </li>
                                <li>
                                    <a href="#!"  >Audio Books</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-2 mb-4 mb-md-0">
                            <span className="  mb-0">DPReview</  span>

                            <ul className="list-unstyled">
                                <li>
                                    <a href="#!"  >Digital</a>
                                </li>
                                <li>
                                    <a href="#!"  >Photography</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-2 mb-4 mb-md-0">
                            <span className="  mb-0">IMDb</  span>

                            <ul className="list-unstyled">
                                <li>
                                    <a href="#!"  >Movies, TV</a>
                                </li>
                                <li>
                                    <a href="#!"  >& Celebrities</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="f3-cols">
                        <div className="col-lg-3 col-md-2 mb-4 mb-md-0">
                            <span className="  mb-0">Shopbop</  span>

                            <ul className="list-unstyled">
                                <li>
                                    <a href="#!"  >Designer</a>
                                </li>
                                <li>
                                    <a href="#!"  >Fashion Brands</a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-2 mb-4 mb-md-0">
                            <span className="  mb-4">Amazon Business</  span>

                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="#!"  >Everything For</a>
                                </li>
                                <li>
                                    <a href="#!"  >Your Business</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-2 mb-4 mb-md-0">
                            <span className="  mb-4">Prime Now</  span>

                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="#!"  >2-Hour Delivery</a>
                                </li>
                                <li>
                                    <a href="#!"  >On Everyday Items</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-2 mb-4 mb-md-0">
                            <span className="  mb-0">Amazon Prime Music</  span>

                            <ul className="list-unstyled">
                                <li>
                                    <a href="#!"  >75 million songs, ad-free</a>
                                </li>
                                <li>
                                    <a href="#!"  >Over 10 million podcast episodes</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <section className='s-containerr mx-auto pt-4'>
                        <a href="#!">Conditions of Use & Sale
                        </a>
                        <a href="#!">Privacy Notice
                        </a>
                        <a href="#!">Interest-Based Ads
                        </a>
                        <a href="#!">© 1996-2022, Amazon.com, Inc. or its affiliates</a>
                    </section>
                </div>
            </footer>
        </div>
    )
}

export default Footer