import React, { useState,useEffect } from 'react'
import Client from 'shopify-buy'

export const ShopContext = React.createContext();

const client = Client.buildClient({
    storefrontAccessToken: "dd4d4dc146542ba7763305d71d1b3d38",
    domain: "graphql.myshopify.com",
  });


export default function ShopProvider(props) {
    // console.log("render shop context")
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({})
    const [checkout, setCheckout] = useState({})
    const [isCartOpen, setIsCartOpen] = useState(false)


    const createCheckout = async () => {
        const checkout = await client.checkout.create()
        localStorage.setItem("checkout",checkout.id)
        setCheckout(checkout)
    }

    const fetchCheckout = async (checkoutId) => {
        client.checkout
            .fetch(checkoutId)
            .then((checkout) => {
                setCheckout(checkout)
            })
            .catch((err) => console.log('aint no heckout'))
    }
        
    useEffect(() => {
        if (localStorage.checkout){
            fetchCheckout(localStorage.checkout);
        }else{
            createCheckout();
        }
    }, [])
        
    const fetchAllProducts = async () =>{
        //grab all the products from shopify
        const products = await client.product.fetchAll() 
        // console.log(products)
        setProducts(products)
    }

    const fetchProductWithId = async (id) => {
        const targetProduct = await client.product.fetch(id)
        setProduct(targetProduct)
    }

    const closeCart = () => {setIsCartOpen(false)}
    const openCart = () => {setIsCartOpen(true)}

    const addItemToCheckout = async (variantId, quantity) => {
        const productToAdd = [{
            variantId,
            quantity: parseInt(quantity,10)
        }]
        const checkoutV = await client.checkout.addLineItems(checkout.id,productToAdd)
        setCheckout(checkoutV)
    }

    const queryItem = async (query) => {
        // const filteredItems = await client.product.fetchQuery(query).then(products => {console.log(products)})
        const filteredItems = await client.product.fetchQuery(query)
        console.log(filteredItems)
        setProducts(filteredItems)
    }

    return (
        <ShopContext.Provider value={{
            products:products,
            product:product,
            checkout:checkout,
            isCartOpen:isCartOpen,
            setProducts:setProducts,
            setProduct:setProduct,
            setCheckout:setCheckout,
            setIsCartOpen:setIsCartOpen,
            fetchAllProducts:fetchAllProducts,
            fetchProductWithId:fetchProductWithId,
            addItemToCheckout:addItemToCheckout,
            openCart:openCart,
            closeCart:closeCart,
            queryItem:queryItem
            }}>
            {props.children} 
            {/* THIS LINE IS NECESSARY!  TO MAKE CONTEXT WORK*/}
        </ShopContext.Provider>
    )
}




// const ShopConsumer = ShopContext.Consumer
// export {ShopConsumer, ShopContext}
// export default ShopProvider


