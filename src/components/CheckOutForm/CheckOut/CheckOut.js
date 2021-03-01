import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import useStyles from './Styles'
import { commerce } from '../../lib/commerce'
import { Link, useHistory } from 'react-router-dom';

const steps = ['Shipping address', 'Payment details']

const CheckOut = ({ cart, onCaptureCheckout, order, error }) => {
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


  let Confirmation = () => (order.customer ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  ));

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
    );
  }

    const Form = () => activeStep === 0 
        ? <AddressForm checkOutToken={checkOutToken} next={next}/>
        : <PaymentForm nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} checkOutToken={checkOutToken} shippingData={shippingData} backStep={backStep}/>

    return (
        <React.Fragment>
            <CssBaseline/>
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

