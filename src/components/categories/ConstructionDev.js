import React from 'react';
import image from "./construction.png"
import image2 from "./coming_soon.png"

const ConstructionDev = () => {
    return (
        <div className='text-center'>
            <img className="my-3" src={image} alt="" width="40%" />
            <img className="my-3" src={image2} alt="" width="10%" />
        </div>
    );
}

export default ConstructionDev;