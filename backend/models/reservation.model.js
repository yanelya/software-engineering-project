import mongoose from 'mongoose'

const reservationTemplate = new mongoose.Schema({
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
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    guests: {
        type: String,
        required: true
    },
    table_number: {
        type: Number,
        required: true
    }
})

export default mongoose.model('reservations', reservationTemplate)