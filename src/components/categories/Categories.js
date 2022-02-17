import React, { useEffect } from 'react'
import ConstructionDev from './ConstructionDev'
import MenuIcon from '@mui/icons-material/Menu';

function Categories(props) {
    useEffect(() => {
        props.setProgress(40);
        props.setProgress(100);
    })

    return (
        <div className='container' style={{ marginTop: "75px", minHeight: "50vh" }}>
            <ConstructionDev />

            <div className="text-center">
                <h4>
                    <b>Untill then you can shop by browsing through <span className='text-white p-1' style={{ borderRadius: "3px", backgroundColor: "#232f3f", fontSize: "medium" }}><MenuIcon className='menu-icon' />All</span> button on the navbar</b>
                </h4>
            </div>
        </div>
    )
}

export default Categories