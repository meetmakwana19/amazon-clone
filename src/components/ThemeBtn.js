import React, { useContext } from 'react'
import themeContext from '../context/theme/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import '../css/Navbar.css'

export default function ThemeBtn() {
    const { handleTheme } = useContext(themeContext);

    return (
        <div>
            <div>
                {/* <div className="form-check form-switch mx-2"> */}
                {/* <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={handleTheme} /> */}
                <label className="form-check-label theme" htmlFor="flexSwitchCheckDefault" onClick={handleTheme}><DarkModeIcon /> Toggle Theme</label>
            </div>
        </div>
    )
}
