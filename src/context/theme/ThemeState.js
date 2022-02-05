import { React, useState } from 'react'
import themeContext from './ThemeContext'

export function ThemeState(props) {
        
    const [darkMode, setDarkMode] = useState(false)

    const handleTheme = () => {
        // making dark to light and when light is there making light to dark.
        setDarkMode(!darkMode)
        if (darkMode) {
            // if darkMode=TRUE
            document.body.style.backgroundColor = "white"
            document.body.style.color = "black"
        }
        else {
            // if darkMode=FALSE
            document.body.style.backgroundColor = "#202125"
            document.body.style.color = "white"
        }
    }
    return (
        <themeContext.Provider value={{ darkMode, setDarkMode, handleTheme }}>{props.children}
        </themeContext.Provider>
    )
}
