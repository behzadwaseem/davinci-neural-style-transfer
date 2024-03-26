import React from 'react';
import { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Banner from './components/Banner/Banner';
import TestUpload from './components/ImageUpload/ImageUpload';
import ImageGallery from './components/ImageGallery/ImageGallery';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={[<Banner/>, <TestUpload/>, <ImageGallery/>]}/>
        </Routes>
      </Router>
    );
  }
}

export default App;
