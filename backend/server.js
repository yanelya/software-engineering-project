import express from "express"
import cors from "cors"
import customers from "./api/customers.route.js"

const app = express()

//applying middleware that express is going to use
app.use(cors())
app.use(express.json())

//routes
//app.METHOD(PATH, HANDLER)
app.use("/", customers)
app.use("*", (req, res) => res.status(404).json({error: "not found" }))

//export app as module to be able to import file that accesses DB
export default app