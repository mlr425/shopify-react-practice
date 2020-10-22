import React, {useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import {ShopContext} from '../context/ShopProvider'
import {Grid, Image, Container, Button, Header, Dropdown} from 'semantic-ui-react'

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
                    <p>COULD DO: add selector for quantity.
                        remove/update items from cart.
                        make selecting color/size/quantity update cart (bc this is an example front end, im going to skip. i believe its just more work using the shopify buy api)
                        should clicking outside of the cart close it?
                        this is just an example website (testing semantic ui, diff libs etc...)
                        and i dont want to spend a lot of time flushing it out
                        /adding all the tiny details


                    </p>
                    </Container>
                    <div className="item-selector-container">
                        {product.options.map(n => {
                            return (
                                <Dropdown key={n.name} className="dropdown" text={n.name}>
                                    <Dropdown.Menu className="dropdown-menu">
                                        {n.values.map(i => {
                                            return(
                                                <Dropdown.Item key={i.value} className="dropdown-item" text={i.value}/>
                                            )
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) 
                        })}
                        {/* <div className="item-color-info">
                            
                        </div>
                        <div className="item-size-info">

                        </div> */}
                    </div>

                    <div className="button-area">
                        <Button className="cartButton"  size="big" onClick={() => {
                            addItemToCheckout(product.variants[0].id,1)
                            openCart()
                        }} >Add to Cart</Button>
                    </div>
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


// {/* {product.options[0].name}
//                         {product.options[1].name} */}
//                         {/* {product.options.map(n => {
//                             return <div> {n.values.map(v => v.value)} </div>
//                         })} */}

//                         {/* {product.options.map(n => {
//                             return <Dropdown.Item> {n.values.map(v => v.value)} </Dropdown.Item>
//                         })} */}

//                         {/* {product.options.map(n => {
//                             return (
//                                 <Dropdown.Item>
//                                     {n.values.map(v => {
//                                         return (
//                                             <Dropdown.Item>
//                                                 {v.value}
//                                             </Dropdown.Item>
//                                         )
                                    
//                                     })} 
//                                 </Dropdown.Item>
//                             ) 
//                         })} */}

                        

//                         <Dropdown text='Size'>
//                             <Dropdown.Menu>
//                             {product.options.map(n => {
//                             return (
//                                 <>
//                                     {n.values.map(v => {
//                                         return (
//                                             <Dropdown.Item>
//                                                 {v.value}
//                                             </Dropdown.Item>
//                                         )
                                    
//                                     })} 
//                                </> 
//                             ) 
//                         })}
//                             </Dropdown.Menu>
//                         </Dropdown>
//                     </div>