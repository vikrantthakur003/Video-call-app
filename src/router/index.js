const router = require('express').Router()
const login = require('../controller/index')

router.use('/', (req,res,next)=>{
    console.log(req.method + ':' + req.url);
    next()
})


router.use('/login', login);

module.exports = router