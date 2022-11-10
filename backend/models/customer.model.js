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
})

export default mongoose.model('customers', customerTemplate)