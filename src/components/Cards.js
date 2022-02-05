import React, { useContext } from 'react'
import themeContext from '../context/theme/ThemeContext';
import "../css/Cards.css"

export default function Cards(props) {

    const { darkMode } = useContext(themeContext);

    return (
        <div>
            <div className={darkMode ? "card-item bg-dark border-light text-white" : "card-item"}>
                <h1 className="card-item-h1">{props.title}</h1>
                <img src={props.cardImg} alt="" />
                <button className={darkMode ? "bg-dark" : null} type="button" onClick={() => window.open(props.linkedToUrl, "_blank")}>{props.btnText}</button>
            </div>
        </div>
    )
}
