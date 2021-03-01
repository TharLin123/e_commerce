import React,{ useEffect, useState } from 'react'
import { Select, MenuItem, Button, Grid, Typography, InputLabel, SelectLabel } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './CustomTextField'
import { commerce } from '../lib/commerce'
import { Link } from 'react-router-dom'

const AddressForm = ({ checkOutToken, next }) => {
    const [ shippingCountries, setShippingCountries ] = useState({})
    const [ shippingCountry, setShippingCountry ] = useState('')
    const [ shippingSubdivisions, setShippingSubdivisions ] = useState({})
    const [ shippingSubdivision, setShippingSubdivision ] = useState('')
    const [ shippingOptions, setShippingOptions] = useState([])
    const [ shippingOption, setShippingOption] = useState('')

    const countries = Object.entries(shippingCountries).map(([code,name])=>({
        id: code, name
    }))     
    const divisions = Object.entries(shippingSubdivisions).map(([code,name])=>({
        id: code, name,
    }))
    const methods = useForm()

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])
    }

    const fetchDivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
    
        setShippingOptions(options);
        setShippingOption(options[0].id);
    };

    useEffect(() => {
        fetchShippingCountries(checkOutToken.id)
    }, [])

    useEffect(() => {
        shippingCountry && fetchDivisions(shippingCountry)
    }, [shippingCountry])

    useEffect(() => {
        if (shippingSubdivision) fetchShippingOptions(checkOutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision]);

    return (
        <div>
            <Typography variant='h6' align='center'>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
                    <Grid container spacing={3}>
                        <FormInput required name='firstName' label='First Name'/>
                        <FormInput required name='lastName' label='Last Name'/>
                        <FormInput required name='address1' label='Address'/>
                        <FormInput required name='email' label='Email'/>
                        <FormInput required name='City' label='City'/>
                        <FormInput required name='ZIP' label='ZIP / Postal code'/>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e)=>setShippingCountry(e.target.value)}>
                                {countries.map((country)=>(
                                    <MenuItem value={country.id} key={country.id}>{country.name}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Divisions</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e)=>setShippingSubdivision(e.target.value)}>
                                {divisions.map((division)=>(
                                    <MenuItem value={division.id} key={division.id}>{division.name}</MenuItem>
                                ))}
                            </Select>
                        </Grid>    
                        <Grid item xs={12}>
                        <InputLabel>Shipping Options</InputLabel>
                        <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                            {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.label}
                            </MenuItem>
                            ))}
                        </Select>
                        </Grid>  
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default AddressForm
