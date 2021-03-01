import React, { useState, useEffect } from 'react'
import { Products, Navbar, Cart, CheckOut } from './components'
import { commerce } from './components/lib/commerce'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {            
    const [ product, setProduct ] = useState([])
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [ cart, setCart ] = useState({})
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProduct = async () => {
        const { data } = await commerce.products.list();
        setProduct(data)
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
    
        setCart(newCart);
      };

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity)
        setCart(item.cart)
    } 

    const hadleUpdateCartQty = async (productId, quantity) => {
        console.log('wtf')
        console.log(productId,quantity);
        const { cart } = await commerce.cart.update(productId, {quantity})
        setCart(cart)
    }

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId)
        setCart(cart)
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty()
        setCart(cart)
    }
    
    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        console.log(checkoutTokenId);
        console.log(newOrder);
        try {
          const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
          console.log(incomingOrder);
          setOrder(incomingOrder);
          refreshCart();
        } catch (error) {
          setErrorMessage(error.data.error.message);
        }
    };

    console.log(order)

    useEffect(()=>{
        fetchProduct()
        fetchCart()
    },[])

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    return (
        <Router>
            <div>
                <Navbar totalItem={cart.total_items}/>
                <Switch>
                    <Route exact path='/'>
                        <Products products={product} onAddToCart={handleAddToCart}/>
                    </Route>
                    <Route exact path='/cart'>
                    <Cart 
                        cart={cart}
                        hadleUpdateCartQty={hadleUpdateCartQty}
                        handleRemoveFromCart={handleRemoveFromCart}
                        handleEmptyCart={handleEmptyCart}
                    />
                    </Route>
                    <Route exact path='/checkout'>
                        <CheckOut cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
