import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Login/Login';
import Home from '../Home/Home';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './App.css';

function App() {
    localStorage.setItem('loginStatus',false);
    return (
      <>
      <Header />
      <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/home" element={<Home/>} />
        </Routes>
      </BrowserRouter>
      </div>
      <Footer />
      </>
    )
}

export default App;
