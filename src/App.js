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
import Payment from './components/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './components/Orders';


const promise = loadStripe('pk_test_51KOQwtSG6G0QGYdvniwXXMSxH52jJnDWtVdl7L3pD9Mxh1C49HVgdfYDO793ELr84paLj2lZ7gZ3EhjBekKTmD1y00Dlpuw96s');

function App() {

  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/" element={<><Navbar /><Home /></>} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/orders" element={<><Navbar /><Orders /></>} />
          <Route exact path="/payment" element={
            <><Navbar />
              <Elements stripe={promise}>
                <Payment />
              </Elements></>} />
          <Route exact path="/basket" element={<><Navbar /><Basket /></>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
