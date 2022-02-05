import { createContext } from "react"

// made a new context to store all the states related to notes.
const themeContext = createContext();

export default themeContext;

// THIS FILE ONLY TELLS REACT THAT WE WANT TO USE useContext

// export const ThemeProvider = (props) => {
//     const [darkMode, setDarkMode] = useState(false)
//     return <themeContext.Provider value={{darkMode, setDarkMode}}>
//         {props.children}
//     </themeContext.Provider>
// }