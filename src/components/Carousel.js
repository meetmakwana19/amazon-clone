import React, { useEffect, useState } from 'react';
import "../css/Carousel.css"
import Cards from './Cards'

const ROOT_URL = process.env.REACT_APP_ROOT_URL

export default function Carousel() {

    const [banner, setBanner] = useState([]);

    // An API must be called in useEffect() hook in rfc
    useEffect(() => {
        getBanners() //this is to call again the function to update the page instantly on delete

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function getBanners() {
        // this api data returns a promise and it is handled with "then" on success and "then" will afterwards resolve that promise
        fetch(`${ROOT_URL}/banner`).then((result) => {
            // even on converting the result, it returns a promise which is to be handles by "then"
            result.json().then((resp) => {
                setBanner(resp)
                for (let i = 0; i < banner.length; i++) {
                    // console.log(banner[i].bannerImage);
                }
            })
        })
    }

    return (
        <div>
            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">

                    <div className="carousel-item active" data-bs-interval="2000" onClick={() => window.open(banner[0].linkedToUrl, "_blank")}>
                        <img src="https://m.media-amazon.com/images/I/61FuWeCuGCL._SX3000_.jpg" className="d-block w-100 img-carousel" alt="..." />
                        {/* <img src={banner[0].bannerImage} className="d-block w-100 img-carousel" alt="..." /> */}
                    </div>

                    {/* to map only from 1-4 i.e no. 1,2,3,4 banners and not 0th index one */}
                    {banner.slice(1, 5).map((item, pos) => {
                        return (
                            <div key={pos} className="carousel-item" data-bs-interval="2000" onClick={() => window.open(item.linkedToUrl, "_blank")}>
                                <img key={pos} src={item.bannerImage} className="d-block w-100 img-carousel" alt="..." />
                            </div>
                        )
                    })}
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
                <Cards className="card-item" title="Win in a scratch card daily" cardImg="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonPay/Rewards/GWBTFPercolateCards/PC_Category_Card_379x304_Jan22._SY304_CB647732771_.jpg" btnText="See more" linkedToUrl="https://www.amazon.in/ref=gw_perc_pc/b?node=18468102031&pf_rd_r=96GDAQP0226J1BNH5FZC&pf_rd_p=619ed254-23a1-4dca-a233-10d828bf10ac&pd_rd_r=95f138e2-559e-4a67-95d3-7dc52978dc34&pd_rd_w=vS89q&pd_rd_wg=tL2hp&ref_=pd_gw_unk" />

                <Cards className="card-item" title="Pay your credit card bills on Amazon" cardImg="https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/Boson/Sid/CCBP/DesktopGateway_CategoryCard_379x304_CCBP._SY304_CB413372299_.jpg" btnText="Pay now" linkedToUrl="https://www.amazon.in/gp/help/customer/display.html?nodeId=GKLD2EQBY7FA7KFH" />

                <Cards className="card-item" title="Alexa, take me to the Moon" cardImg="https://images-eu.ssl-images-amazon.com/images/G/31/PR/Alexa_moon_CC_PC_379x304._SY304_CB646625848_.jpg" btnText="Read more stories" linkedToUrl="https://www.aboutamazon.in/?pf_rd_r=RJ9PK4DSGFT37MBJ2FQT&pf_rd_p=16833406-f106-43cd-8a16-e8c2dd614ab7&pd_rd_r=17be4bc0-24b7-40cf-a027-5779249f99d5&pd_rd_w=vb1Tb&pd_rd_wg=qI45F&ref_=pd_gw_unk" />
            </div>
        </div>
    )
}
