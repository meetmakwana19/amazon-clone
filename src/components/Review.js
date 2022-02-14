import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarRatings from 'react-star-ratings';

function Review(props) {
    return (
        <div className='container'>
            <small > <AccountCircleIcon style={{ fontSize: 'x-large', color: "lightgray" }} /> {props.user}</small>
            <div className="content mx-4 my-1">
                <h5><strong>{props.headline}</strong></h5>
                <StarRatings className="mt-n3"
                    rating={props.rating}
                    starDimension="20px"
                    starSpacing="1px"
                    starRatedColor="#fea31d" /> <small>{props.rating}</small>

                <p>{props.review}</p>
            </div>
            <hr />
        </div >
    )
}

export default Review