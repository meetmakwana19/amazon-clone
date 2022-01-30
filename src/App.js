import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Basket from './components/Basket';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { useEffect } from 'react';
import { useStateValue } from './context/cart-count/CartStateContext';

function App() {

  const [dispatch] = useStateValue();

  // to keep a track of who is logged in 
  useEffect(() => {
    const getUser = async () => {

      console.log("Getting user details");
      // API Call
      const response = await fetch(`http://localhost:8080/auth/getUser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("token")
        }
      });
      const resp = await response.json();
      console.log("User details:", resp);
      const userName = resp.name;
      console.log(userName);

      dispatch({
        type: "SET_USER",
        user: userName
      })
    };
    getUser();

  }); //will run once at initialization


  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/" element={<><Navbar /><Home /></>} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/basket" element={<><Navbar /><Basket /></>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
