import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Weather from './components/weather';

function App() {
  return (
    <div className = "App">
      <Router>
        <Routes>
          <Route path= "/" element={<Weather />} />
          <Route path= "/weather" element={<Weather />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App;