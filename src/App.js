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
import Address from './components/Address';
import { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';


const promise = loadStripe('pk_test_51KOQwtSG6G0QGYdvniwXXMSxH52jJnDWtVdl7L3pD9Mxh1C49HVgdfYDO793ELr84paLj2lZ7gZ3EhjBekKTmD1y00Dlpuw96s');

function App() {

  const [progress, setProgress] = useState(0)

  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        <LoadingBar
          color='#f08804'
          height={3}
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<><Navbar setProgress={setProgress} /><Home setProgress={setProgress} /></>} />
          <Route exact path="/signin" element={<SignIn setProgress={setProgress} />} />
          <Route exact path="/signup" element={<SignUp setProgress={setProgress} />} />
          <Route exact path="/orders" element={<><Navbar setProgress={setProgress} /><Orders setProgress={setProgress} /></>} />
          <Route exact path="/address" element={<><Navbar setProgress={setProgress} /><Address /></>} />
          <Route exact path="/payment" element={
            <><Navbar setProgress={setProgress} />
              <Elements stripe={promise}>
                <Payment setProgress={setProgress} />
              </Elements></>} />
          <Route exact path="/basket" element={<><Navbar setProgress={setProgress} /><Basket setProgress={setProgress} /></>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
