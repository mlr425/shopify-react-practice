import React , {useState, useEffect, useContext} from 'react';
import '../css/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import ShopProvider from '../context/ShopContext';
import Navbar from './Navbar'
import ProductPage from '../pages/ProductPage';
import Home from '../pages/Home';
import Cart from '../components/Cart';
import {ShopContext} from '../context/ShopProvider';
import ShopProvider from '../context/ShopProvider';
import ScrollToTop from './ScrollToTop';


function App(props) {

  return (
    <ShopProvider>
      <Router>
        {/* <ScrollToTop> */}
        <ScrollToTop/>

        
        <Navbar/>
        <Cart/>
        <Switch>
          <Route path="/" exact component={Home}/> 
          <Route path="/product/:id" component={ProductPage}/>
        </Switch>
        {/* </ScrollToTop> */}
      </Router>
    </ShopProvider>
    
  );
}

export default App;
