import React from 'react'
import "../css/Cards.css"

export default function Cards(props) {

    return (
        <div>
            <div className="card-item">
                <h1 className="card-item-h1">{props.title}</h1>
                <img src={props.cardImg} alt="" />
                <button type="button">{props.btnText}</button>
            </div>
        </div>
    )
}
