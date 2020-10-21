import React, {useContext}  from 'react'
import {ShopContext} from '../context/ShopProvider'
import {Grid, Image,Button, Sidebar} from 'semantic-ui-react'
export default function Cart() {

    const {isCartOpen, setIsCartOpen, checkout} = useContext(ShopContext)

    function handleCart(){
        setIsCartOpen(prevState => !prevState)
    }

    return (
        <Sidebar
        visible={isCartOpen}
        direction="right"
        width="very wide"
        animation={"overlay"}
        >
            
            
            <div className="cart-button-area">
                <h1 className="shopping-cart-title">Shopping Cart</h1>
                <Button 
                className="cart-button" 
                size='medium' 
                color='blue' 
                // attached='left'
                onClick={handleCart}>
                    &times;
                </Button>
            </div>
            
            {checkout.lineItems && checkout.lineItems.map(item => (
                <div key={item.id}>
                    <Grid className="grid-container" columns={3}>
                        <Grid.Row className="grid-wrapper">
                            <Grid.Column className="grid-col1">
                                <Image className="cart-img" src={item.variant.image.src} size="small"></Image>
                            </Grid.Column>
                            <Grid.Column className="grid-col2">
                                <div>Item: {item.title}</div>
                                <div>Color / Size: {item.variant.title}</div>
                                <div>Quantity: {item.quantity}</div>
                            </Grid.Column>
                            <Grid.Column>
                                <div>${item.variant.price}</div>
                                
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    
                </div>
            )) }
            <div className="centerValue">
            <Button className="checkout" href={checkout.webUrl} primary fluid target="_blank">Checkout</Button>
            </div>
        </Sidebar>

        // <div className="ui visible very wide right sidebar">
            
        // </div>


    )
}
