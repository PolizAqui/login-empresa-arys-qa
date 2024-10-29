const { LOGIN } = require('../global/_var.js')

/******* DEPÉNDENCY  *******/

const express = require('express')
const route = express.Router()

/******** CONTROLLERS *******/

const getInfoController = require('../controller/getInfo.Controller.js')

/********* ROUTES *********/

route.post(LOGIN, getInfoController.login)

module.exports = route