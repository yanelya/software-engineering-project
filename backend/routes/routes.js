import express from 'express'
import customerTemplate from '../models/customer.model.js'
import reservationTemplate from '../models/reservation.model.js'
import tableModel from '../models/table.model.js'
import jwt from 'jsonwebtoken'
//import bcrypt from 'bcrypt'

const router = express.Router()

const JWT_SECRET = "euyew88r8uewjksdfjkspof0esiroe8()*$JAWierieirier"

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

    //change to bcrypt compare later
    if(password === user.password){
        const token = jwt.sign({email: user.email}, JWT_SECRET)

        if(res.status(201)){
            return res.json({status: "ok", data: token})
        }
        else{
            return res.json({error: "error"})
        }

    }

    res.json({status: "error", error: "invalid Password"})
})


router.post('/userData', async (req, res) => {
    const { token } = req.body

    try{
        const user = jwt.verify(token, JWT_SECRET)

        const useremail = user.email
        
        customerTemplate.findOne({email: useremail})
            .then((data) => {
                res.send({status: "ok", data: data})
            })
    }
    catch{}
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

router.get('/reservations', (req, res) => {
    reservationTemplate.find()
    .then(data => {
        res.json(data)
        console.log('Reservations returned')
    })
    .catch(error => {
        res.json(error)
        console.log('Error getting reservations')
        return error.res
    })
})

router.get('/tables', (req, res) => {
    tableModel.find()
    .then(data => {
        res.json(data)
        console.log('getting table info')
    })
    .catch(error => {
        res.json(error)
        console.log('Error getting table info')
        return error.res
    })
})


export default router