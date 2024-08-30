import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Weather from './components/weather';
import Header from './components/header';

function App() {
  return (
    <div className = "App">
      <Header />
      <Router>
        <Routes>
        </Routes>
      </Router>
    </div>
  )
}

export default App;