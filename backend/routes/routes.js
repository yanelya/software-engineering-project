import express from 'express'
import customerTemplate from '../models/customer.model.js'
import reservationTemplate from '../models/reservation.model.js'

const router = express.Router()

router.post('/customers', (req, res) => {
    const newCustomer = new customerTemplate({
        first: req.body.first,
        last: req.body.last,
        phone: req.body.phone,
        email: req.body.email
    })
    
    newCustomer.save()
    .then(data => {
        res.json(data)
        console.log("Customer data saved.")
    })
    .catch(error => {
        res.json(error)
        console.log("Error saving response")
    })
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
    })
})


export default router