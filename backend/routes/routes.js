import express from 'express'
import customerTemplate from '../models/customer.model.js'
import reservationTemplate from '../models/reservation.model.js'

const router = express.Router()

router.post('/customers', (req, res) => {
    const newCustomer = new customerTemplate({
        first: req.body.first,
        last: req.body.last,
        phone: req.body.phone,
        email: req.body.email,
        billing_address: req.body.billing_address,
        mailing_address: req.body.mailing_address,
        password: req.body.password,
        payment_method: req.body.payment_method,
        points: 0,
        preferred_diner: 0
    })

    newCustomer.save()
    .then(data => {
        res.json(data)
        console.log("Customer data saved.")
    })
    .catch(error => {
        res.json(error)
        console.log("Error saving response")
        return error.response;
    })
})

router.post('/login', async (req, res) => {
    const { email,  password} = req.body
    
    const user = await customerTemplate.findOne({email});

    if(!user){
        return res.json({error: "User Not found"})
    }

    return res.json({success: "User found"})
})

/*
router.post('/reservations', (req, res) => {
    const newReservation = new reservationTemplate({
        first: req.body.first,
        last: req.body.last,
        phone: req.body.phone,
        email: req.body.email,
        date: req.body.date,
        time: req.body.time,
        guest: req.body.guests
    })
    
    newReservation.save()
    .then(data => {
        console.log("Reservation data saved.")
        res.json(data)
    })
    .catch(error => {
        console.log("Error saving response")
        res.json(error)
    })
})*/

router.get('/reservations', (request, response) => {
    reservationTemplate.find()
    .then(data => {
        response.json(data)
        console.log('Reservations returned')
    })
    .catch(error => {
        response.json(error)
        console.log('Error getting reservations')
        return error.response;
    })
})


export default router