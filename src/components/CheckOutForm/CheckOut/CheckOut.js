import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import useStyles from './Styles'
import { commerce } from '../../lib/commerce'

const steps = ['Shipping address', 'Payment details']

const CheckOut = ({ cart }) => {
    const [ activeStep, setActiveStep ] = useState(0)
    const [ checkOutToken, setCheckOutToken ] = useState(null)
    const [ shippingData, setShippingData ] = useState({})
    const classes = useStyles();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
                setCheckOutToken(token)
            } catch (error) {
                console.log('error generating token');
            }
        }
        generateToken()
    },[cart])  

    const nextStep = () => setActiveStep((prevStep)=> prevStep + 1)
    const backStep = () => setActiveStep((prevStep)=> prevStep - 1)

    const next = data => {
        setShippingData(data)
        nextStep()
    }

    const Confirmation = () => (
        <React.Fragment>
            Confirmation
        </React.Fragment>
    )

    const Form = () => activeStep === 0 
        ? <AddressForm checkOutToken={checkOutToken} next={next}/>
        : <PaymentForm checkOutToken={checkOutToken} backStep={backStep}/>

    return (
        <React.Fragment>
            <div className={classes.toolbar}>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography variant='h4' align='center'>Checkout</Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map((step,index) => (
                                <Step key={index}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length ? <Confirmation/> : checkOutToken && <Form/>}
                    </Paper>
                </main>
            </div>
        </React.Fragment>
    )
}

export default CheckOut

