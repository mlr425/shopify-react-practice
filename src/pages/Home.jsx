import React from 'react'
import { useEffect, useContext,useState } from 'react'
import {Link} from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {ShopContext} from '../context/ShopProvider'
import { Button, Container,Grid } from 'semantic-ui-react'
import Searchbar from '../components/Searchbar'

export default function Home() {
    const { fetchAllProducts, products,setProducts,queryItem } = useContext(ShopContext)
    const [searchWord, setSearchWord] = useState("")

    function handleSearch(newValue){
        setSearchWord(newValue)
    }

    //on first load, get all items
    useEffect(() => {
        //React Hook useEffect has a missing dependency: 'fetchAllProducts'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
        //if i add fetchAllProducts to the watch list, ([]) then it starts rerendering my shop context? inf loop? look into this 
        fetchAllProducts()
    },[])

    //when you use the search bar, find the item
    useEffect(() => {
        queryItem({query:searchWord})
    }, [searchWord])




    if (!products){
        return <div> loading products </div>
    }

    return (
        <>
            <Container className="home-container">
            <div className="search-bar">
                <Searchbar value={searchWord} onChange={handleSearch} />
            </div>
                <Container className="home-wrapper">
                    {products.map(product => {
                        return (
                            <div className="home-card" key={product.id}>
                                    <Link to={`/product/${product.id}`} className="home-links">
                                    <img className="home-card-img" src={product.images[0].src}>  
                                    </img>
                                    <div className="home-card-title">
                                        {product.title}
                                    </div>
                                    <div className="home-card-price">
                                        ${product.variants[0].price}
                                    </div>
                                    </Link>
                            </div>
                        )
                    }) }
                </Container>
            </Container>

        </>
        
    )
}

