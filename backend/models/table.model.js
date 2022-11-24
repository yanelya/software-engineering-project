import mongoose from 'mongoose'

const tableTemplate = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    seats: {
        type: Number,
        required: true
    }
})

export default mongoose.model('tables', tableTemplate)