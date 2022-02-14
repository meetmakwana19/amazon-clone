import React, { useContext } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarRatings from 'react-star-ratings';
import themeContext from '../context/theme/ThemeContext';

function Review(props) {
    const { darkMode } = useContext(themeContext);
    return (
        <div className='container'>
            <small className={darkMode ? "text-black" : null} > <AccountCircleIcon style={{ fontSize: 'x-large', color: "lightgray" }} /> {props.user}</small>
            <div className="content mx-4 my-1">
                <h5 className='m-0'><strong>{props.headline}</strong></h5>
                <StarRatings className="mt-n3"
                    rating={props.rating}
                    starDimension="20px"
                    starSpacing="1px"
                    starRatedColor="#fea31d" /> <small>{props.rating}</small>
                <p style={{ color: "gray", margin: "0" }}>Reviewed on {props.date}</p>
                <p>{props.review}</p>
            </div>
            <hr />
        </div >
    )
}

export default Review