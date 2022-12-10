import React, { Component } from 'react';
import './App.css';
import Map from './components/Map'  
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Charts from './components/Charts';
import NotFound from './components/NotFound';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Map/>}/>
              <Route path='/charts' element={<Charts/>}/>
              <Route path="*" element={<NotFound />}></Route>
          </Routes>
      </BrowserRouter>  
      <Footer/>
    </div>
  );
}

export default App;