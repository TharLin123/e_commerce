import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core'
import useStyles from './Styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const Product = ({ product, onAddToCart }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.media.source} title={product.title}/>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography className={classes.typography} variant='h6' gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant='h6' gutterBottom>
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography variant='body2' dangerouslySetInnerHTML={{ __html: product.description }} color='textSecondary'></Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label='Add to Cart' onClick={()=>{onAddToCart(product.id,1)}}>
                    <ShoppingCartIcon/>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
