import React, {useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import {ShopContext} from '../context/ShopProvider'
import {Grid, Image, Container, Button, Header} from 'semantic-ui-react'

import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";

//https://reactrouter.com/web/example/url-params


export default function ProductPage(props) {
    let {id} = useParams();
    const {fetchProductWithId, addItemToCheckout, product, openCart} = useContext(ShopContext)


    useEffect(() => {
        fetchProductWithId(id)
    }, [fetchProductWithId,id])




    // if we dont have products, display loading screen
    if (!product.title){
        return <div> loading product </div>
    }

    return (
        <Grid divided stackable>
        <Grid.Row>
            <Grid.Column className="grid-col-1" width={8}>
                {/* i know there's a warning assoc. w/ this library. but its not causing any problems that i can identify, so leave as is for now.  */}
                <Carousel className="img-carousel" showThumbs={true} centerMode={true} >
                {product.images.map(imgV => {
                    return <img 
                        key={product.id} 
                        className="img-On-carousel" 
                        src={imgV.src}>
                    </img>
                })}
                </Carousel>
                

            </Grid.Column>
            <Grid.Column width={8}>
            <div className="product-container">
                <div className="product-wrapper">
                    <Header as='h1' className="product-title">{product.title}</Header>
                    <div className="product-price">${product.variants[0].price}</div>
                    <div className="product-stock">{product.availableForSale ? 'Product in Stock' : 'Out of Stock'}</div>
                    <Container className="container2" text>
                    <div className="product-vendor">{product.vendor}</div>
                    <p>{product.description}</p>
                    <p>todo: add selectors for size, color, quantity.
                        remove items from cart/update cart.
                        should clicking outside of the cart close it?
                    </p>
                    </Container>

                    <Button className="cartButton"  size="big" onClick={() => {
                        addItemToCheckout(product.variants[0].id,1)
                        openCart()
                    }} >Add to Cart</Button>
                </div>
            </div>
            </Grid.Column>
        </Grid.Row>    
    </Grid>
    )
}

{/* <Carousel>
                {product.images.map(imgV => {
                    
                    return <img key={product.id} className="img-On-carousel" src={imgV.src} ></img>
                })}
                </Carousel> */}