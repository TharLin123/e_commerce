import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import logo from '../../assets/commerce.png'
import useStyles from './styles'
import { Link } from 'react-router-dom'

const Navbar = ({ totalItem }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to='/' variant='h6' className={classes.title}>
                        <img src={logo} className={classes.image}/>
                        BE CLASSY, BE YOU
                    </Typography>
                    <IconButton component={Link} to='/cart'>
                    <Badge badgeContent={totalItem} color="primary">
                        <ShoppingCart/>
                    </Badge>
                    </IconButton>
                </Toolbar>
                <div className={classes.grow}/>
                <div className={classes.button}/>
            </AppBar>
        </React.Fragment>
    )
}   

export default Navbar
