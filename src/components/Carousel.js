import React from 'react'
import "../css/Carousel.css"
import Cards from './Cards'

export default function Carousel() {
    return (
        <div>
            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="2000">
                        <img src="https://m.media-amazon.com/images/I/61FuWeCuGCL._SX3000_.jpg" className="d-block w-100 img-carousel" alt="..." />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
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
                    </div>
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

                <Cards className="card-item" title="Upgrade your home | Amazon Brands &#38; more" cardImg="https://images-eu.ssl-images-amazon.com/images/G/31/img21/CEPC/Clearance/May21/V238940049_IN_PC_BAU_Edit_Creation_Laptops1x._SY304_CB667377205_.jpg" btnText="Shop now" />

                <Cards className="card-item" title="Revamp your home in style" cardImg="https://images-eu.ssl-images-amazon.com/images/G/31/img21/CEPC/Clearance/May21/V238940049_IN_PC_BAU_Edit_Creation_Laptops1x._SY304_CB667377205_.jpg" btnText="Explore all" />

                {/* <Cards className="card-item" title="Sign in for your best experience" btnText="Sign-in for best experience" /> */}
            </div>

        </div>
    )
}
