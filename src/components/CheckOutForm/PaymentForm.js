import React from 'react'
import { Typography, Button, Divider } from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from './Review'

const stripePromise = loadStripe(' ... ')

const PaymentForm = ({ checkOutToken, backStep }) => {
    return (
        <React.Fragment>
            <Review checkOutToken={checkOutToken}/>
            <Divider/>
            <Typography variant='h6' style={{margin: '20px 0'}}>
                Payment Method
            </Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe })=>(
                        <form>
                            <CardElement/>
                            <br/> <br/>
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <Button variant='outlined' onClick={backStep}>Back</Button>
                                <Button type='submit' variant='contained' disabled={!stripe} color='primary'>
                                    Pay { checkOutToken.live.subtotal.formatted_with_symbol }
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </React.Fragment>
    )
}

export default PaymentForm
