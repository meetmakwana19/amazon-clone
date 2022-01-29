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

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/" element={<><Navbar /><Home /></>} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/basket" element={<><Navbar /><Basket /></>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
