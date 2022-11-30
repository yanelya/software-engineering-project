import express from 'express'
import customerTemplate from '../models/customer.model.js'
import reservationTemplate from '../models/reservation.model.js'
import tableModel from '../models/table.model.js'
import jwt from 'jsonwebtoken'
//import bcrypt from 'bcrypt'

const router = express.Router()

const JWT_SECRET = "euyew88r8uewjksdfjkspof0esiroe8()*$JAWierieirier"


/************************* CUSTOMER ENDPOINT *************************/
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

/************************* LOGIN ENDPOINT ******************************/
router.post('/login', async (req, res) => {
    const { email,  password } = req.body
    
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

/************************* USERDATA ENDPOINT *****************************/
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

/************************* RESERVATIONS ENDPOINT *************************/
router.post('/reservations', (req, res) => {
    console.log('in backend')
    const newReservation = new reservationTemplate({
        first: req.body.first,
        last: req.body.last,
        phone: req.body.phone,
        email: req.body.email,
        date: req.body.date,
        time: req.body.time,
        guests: req.body.guests,
        table_number: req.body.table_number
    })
    
    newReservation.save()
    .then(data => {
        console.log("Reservation data saved.")
        res.json(data)
    })
    .catch(error => {
        console.log("Error saving reservation")
        res.json(error)
        return error.res
    })
})

router.get('/reservations', (req, res) => {
    reservationTemplate.find()
    .then(data => {
        console.log('getting reservations in get endpoint')
        res.json(data)
    })
    .catch(error => {
        res.json(error)
        console.log('Error getting reservations')
        return error.res
    })
})

/************************* TABLES ENDPOINT ***************************/
router.get('/tables', (req, res) => {
    tableModel.find()
    .then(data => {
        console.log('getting tables from get endpoint')
        res.json(data)
    })
    .catch(error => {
        res.json(error)
        console.log('Error getting table info')
        return error.res
    })
})

export default router