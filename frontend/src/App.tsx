import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import WeatherContainer from './components/weather-container';
import Header from './components/header';
import Grid from './components/grid';

function App() {
  return (
    <div className = "App">
      <Header />
      <Grid />
    </div>
  )
}

export default App;