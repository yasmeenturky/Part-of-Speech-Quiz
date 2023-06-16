import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Practice from "./pages/practice";
import Rank from "./pages/rank";
import Home from './pages/home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/practice" element={<Practice/>}/>
          <Route path="/rank" element={<Rank/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
