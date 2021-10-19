const express = require('express')
const actions = require('../methods/actions')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.get('/dashboard', (req, res) => {
    res.send('Dashboard')
})

//@desc Adding new user
//@route POST /adduser
router.post('/adduser', actions.addNew)

router.post('/addSuggestion', actions.addNewSuggestion)

router.post('/addVisitor', actions.addNewVisitor)

//@desc Authenticate a user
//@route POST /authenticate
router.post('/authenticate', actions.authenticate)

//@desc Get info on a user
//@route GET /getinfo
router.get('/getinfo', actions.getinfo)

router.post('/postUserinfo', actions.postUserinfo)

router.post('/postSuggestion', actions.postSuggestions)

router.post('/changepass', actions.changepass)

router.post('/changeFirstname', actions.changeFirstname)

router.post('/changeLastname', actions.changeLastname)

router.post('/changeMiddleinitial', actions.changeMiddleinitial)

router.post('/changeAddress', actions.changeAddress)

router.post('/changePhonenumber', actions.changePhonenumber)



module.exports = router
