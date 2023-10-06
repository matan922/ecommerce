import React from "react";
import Home from "./components/Home";
import "./App.scss";
import Navbar from "./components/Navbar";
import { Cart } from "./components/cart/Cart";
import SignIn from "./components/signIn/SignIn";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/profile/Profile";
import Admin from "./components/admin/Admin";
import Register from './components/register/Register'

import ProductDetailPage from './components/product/ProductDetailPage' 


function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <Navbar />
        </header>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/about" element={<Home />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/login" element={<SignIn />} />

        <Route path="/register" element={<Register/>} />
        <Route path="/products/:productId" element={<ProductDetailPage/>} />

      </Routes>
    </Router>
  );
}

export default App;