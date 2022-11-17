import mongoose from 'mongoose'

const customerTemplate = new mongoose.Schema({
    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    billing_address: {
        type: String
    },
    mailing_address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    payment_method: {
        type: String,
        required: true
    },
    points: {
        type: Number
    },
    preferred_diner: {
        type: Number
    }
})

export default mongoose.model('customers', customerTemplate)