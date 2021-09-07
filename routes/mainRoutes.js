const express = require('express')
const router = express.Router()

const { login, dashboard } = require('../controllers/mainController')

const isAuthenticated = require('../middleware/auth')

router.route('/dashboard').get(isAuthenticated, dashboard)
router.route('/login').post(login)

module.exports = router
