import React from 'react'
import {BrowserRouter as Router, 
    Routes,
    Route} 
    from 'react-router-dom';
import { Home } from '../components/Home';
import {Product} from '../components/Product';
import Carrito from '../components/Carrito'

import { createGlobalStyle } from "styled-components";
import Search from '../components/Search';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap');
  body {
    font-family: 'Inter', sans-serif;
    background-color: #F2F2F2;
  }
`

export const AppRouter = () => {
    return (
        <>
            <Router>
                <GlobalStyles/>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/product" element={<Product/>}/>
                    <Route exact path="/cart" element={<Carrito/>}/>
                    <Route exact path="/search" element={<Search/>}/>
                </Routes>
            </Router>
        </>
    )
}