import React, { useState, useEffect } from 'react'
import { Products, Navbar, Cart, CheckOut } from './components'
import { commerce } from './components/lib/commerce'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {            
    const [ product, setProduct ] = useState([])
    const [ cart, setCart ] = useState({})

    const fetchProduct = async () => {
        const { data } = await commerce.products.list();
        setProduct(data)
    }

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

    useEffect(()=>{
        fetchProduct()
        fetchCart()
    },[])

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
                        <CheckOut cart={cart}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
