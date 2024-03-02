const {register, login} = require('../Controlers/UserControlers');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;