import React from 'react'
import useStyles from './Styles'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import CartItem from './CartItem/CartItem'
import Link from '@material-ui/core/Link';
import { Link as link } from 'react-router-dom'

const Cart = ({ cart, hadleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant='subtitle1'>
            You have no items in your shopping cart, 
            <Link href="/">
            start adding some.
            </Link>
        </Typography>
    )

    const FilledCart = () => (
        <React.Fragment>    
            <Typography variant='h4' align="center" className={classes.cartTitle}>
                Shopping Cart
            </Typography>
            <Grid container spacing={3} justify='center'>
                {cart.line_items.map((item)=>(
                    <Grid item xs={12} md={3} key={item.id}>
                        <CartItem 
                            item={item} 
                            onUpdateCartQty={hadleUpdateCartQty}
                            onRemoveFromCart={handleRemoveFromCart}
                        />
                    </Grid>
                ))}
            </Grid>
            <Grid container className={classes.cardDetails}>
                <Grid item>
                    <Typography variant='h5' align='center'>
                        Subtotal: {cart.subtotal.formatted_with_symbol}
                    </Typography>
                </Grid>
                <Grid item>
                    <Button className={classes.emptyButton}
                            size='medium' 
                            type='button' 
                            variant='contained' 
                            color='secondary'
                            onClick={handleEmptyCart}>Empty Cart</Button>
                    <Button className={classes.checkoutButton}
                            size='medium' 
                            type='button' 
                            variant='contained' 
                            color='primary'
                            component={link}
                            to='/checkout'>Check Out</Button>
                </Grid>
                
            </Grid>
        </React.Fragment>
    )

    if (!cart.line_items){
        return(
            <div>
                <br/>
                <br/>
                <h1>Loading....</h1>
            </div>
        )
    }

    return (
           <Container className={classes.container}>
               <div className={classes.toolbar}>
                    <Typography></Typography>
                    { !cart.line_items.length ? <EmptyCart/> : <FilledCart/> }
               </div>
           </Container>
    )   
}

export default Cart
