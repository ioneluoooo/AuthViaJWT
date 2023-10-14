const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const authRouter = require('./AuthRouter')

const app = express()

app.use(express.json()) // parsing into json
app.use('/auth', authRouter) // listening to the router

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://qwerty:<YOUR_PASSWORD>@cluster0.uygy905.mongodb.net/<PROJECT_NAME>?retryWrites=true&w=majority`)
        // connected to the mongodb cluster 
        app.listen(PORT, () => console.log(`server started at ${PORT}`))
        
    } catch (error) {
        console.log(e)
    }
}

start()
