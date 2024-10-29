const express = require('express')
const app = express()
const _var = require('./global/_var.js')
const cors = require('cors')

/******* ROUTES ********/

const route = require('./routes/auth.routes.js')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

/******* SERVER ******/

app.listen(_var.PORT, (err) => {
    if ( err) throw err
    console.log(`Servidor ejecutado en: http://localhost:${_var.PORT}`);
})

/******* Export ********/

app.use(route)