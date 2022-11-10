import express from 'express'
import customerTemplate from '../models/customer.model.js'

const router = express.Router()

router.post('/customers', (req, res) => {
    const newCustomer = new customerTemplate({
        first: req.body.first,
        last: req.body.last,
        phone: req.body.phone,
        email: req.body.email,
    })
    
    newCustomer.save()
    .then(data => {
        console.log("data saved.")
        res.json(data)
    })
    .catch(error => {
        console.log("Error saving response")
        res.json(error)
    })
})


export default router