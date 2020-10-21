import React , {useState, useEffect, useContext} from 'react';
import '../css/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import ShopProvider from '../context/ShopContext';
import Navbar from './Navbar'
import ProductPage from '../pages/ProductPage';
import Home from '../pages/Home';
import Cart from '../components/Cart';
import ShopProvider from '../context/ShopProvider';



function App() {
  
  return (
    <ShopProvider>

      <Router>
        <Navbar/>
        <Cart/>
        <Switch>
          <Route path="/" exact component={Home}/> 
          <Route path="/product/:id" component={ProductPage}/>
        </Switch>
      </Router>
    </ShopProvider>
    
  );
}

export default App;
