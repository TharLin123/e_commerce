import React from 'react'
import { Grid } from '@material-ui/core';
import Product from './Product'
import './Product.css'

function Products({products, onAddToCart}) {
    return (
        <div className='Product'>
            <Grid container spacing={0} justify='center'>
                {products.map((product) => (
                    <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}
export default Products
