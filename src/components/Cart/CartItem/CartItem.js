import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './Styles';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {

  const classes = useStyles();

  const handleUpdateCartQty = (lineItemId, newQuantity) => {
    console.log(item.quantity);
    console.log(lineItemId, newQuantity);
    onUpdateCartQty(lineItemId, newQuantity);
  }

  return (
    <Card className="cart-item">
      <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">{item.name}</Typography>
        <Typography variant="h6">{item.line_total.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions>
        <div className={classes.cardActions}>
          <Button type="button" size="small" onClick={() => {handleUpdateCartQty(item.id, item.quantity - 1)}}>-</Button>
          <Typography>{item.quantity}</Typography>
          <Button type="button" size="small" onClick={() => {handleUpdateCartQty(item.id, item.quantity + 1)}}>+</Button>
          <Button variant="contained" type="button" color="secondary" onClick={() => onRemoveFromCart(item.id)}>Remove</Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default CartItem;