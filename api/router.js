const express = require('express')
const router = express.Router()
const controller = require('./controller.js/home')


router.get('/users', controller.getHome);
router.post('/addusers', controller.addEmployee)
router.get('/candidates/appointment/:id', controller.appointmentPDF);

module.exports = router