const User = require('../services/user')
const {Router} = require('express')
const {body,validationResult} = require('express-validator')
const asyncHandler = require('express-async-handler')
const Email = require('../services/email')
const router = new Router();
router.get('/',function(req,res){
    
})