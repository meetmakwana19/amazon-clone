import React, { useEffect, useState } from 'react';
import "../css/Carousel.css"
import Cards from './Cards'

export default function Carousel() {

    const [banner, setBanner] = useState([]);
    // const [banner1, setBanner1] = useState([]);
    // const [banner2, setBanner2] = useState([]);
    // const [banner3, setBanner3] = useState([]);
    // const [banner4, setBanner4] = useState([]);
    // const [banner5, setBanner5] = useState([]);

    // An API must be called in useEffect() hook in rfc
    useEffect(() => {
        getBanners() //this is to call again the function to update the page instantly on delete

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function getBanners() {
        // this api data returns a promise and it is handled with "then" on success and "then" will afterwards resolve that promise
        fetch("http://localhost:8080/banner").then((result) => {
            console.log("getting banners");
            // even on converting the result, it returns a promise which is to be handles by "then"
            result.json().then((resp) => {
                setBanner(resp)
                console.log("1st banner", banner[0].bannerImage);
                console.log("banner state:", banner);
                for (let i = 0; i < banner.length; i++) {
                    console.log(banner[i].bannerImage);
                }
            })
        })
    }

    return (
        <div>
            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="2000">
                        <img src="https://m.media-amazon.com/images/I/61FuWeCuGCL._SX3000_.jpg" className="d-block w-100 img-carousel" alt="..." />
                        {/* <img src={banner[0].bannerImage} className="d-block w-100 img-carousel" alt="..." /> */}
                    </div>
                    {/* to map only from 1-4 i.e no. 1,2,3,4 banners and not 0th index one */}
                    {banner.slice(1, 5).map((item, pos) => {
                        return (
                            <div className="carousel-item" data-bs-interval="2000">
                                <img key={pos} src={item.bannerImage} className="d-block w-100 img-carousel" alt="..." />
                            </div>
                        )
                    })}
                    {/* <div className="carousel-item" data-bs-interval="2000">
                        <img src="https://m.media-amazon.com/images/I/71peQalLMUL._SX3000_.jpg" className="d-block w-100 img-carousel" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://m.media-amazon.com/images/I/61Phhx+x-CL._SX3000_.jpg" className="d-block w-100 img-carousel" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://m.media-amazon.com/images/I/71u+a7GlhfL._SX3000_.jpg" className="d-block w-100 img-carousel" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://m.media-amazon.com/images/I/61hXw5RjjqL._SX3000_.jpg" className="d-block w-100 img-carousel" alt="..." />
                    </div> */}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className="cards">

                {/* passing props along with the Crads. */}
                <Cards className="card-item" title="Up to 70% off | Electronics clearance store" cardImg="https://images-eu.ssl-images-amazon.com/images/G/31/img21/CEPC/Clearance/May21/V238940049_IN_PC_BAU_Edit_Creation_Laptops1x._SY304_CB667377205_.jpg" btnText="See more" />

                <Cards className="card-item" title="Pay your credit card bills on Amazon" cardImg="https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/Boson/Sid/CCBP/DesktopGateway_CategoryCard_379x304_CCBP._SY304_CB413372299_.jpg" btnText="Pay now" />

                <Cards className="card-item" title="Upgrade your home | Amazon Brands & more" cardImg="https://i.ibb.co/7tjmzdR/Screenshot-2022-01-02-180409.png" btnText="Explore all" />

                {/* <Cards className="card-item" title="Sign in for your best experience" btnText="Sign-in for best experience" /> */}
            </div>

        </div>
    )
}
