"use strict"
/* ------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/user:
const permissions = require('../middlewares/permissions')
const user = require('../controllers/user')

// URL: /users
router.get('/verify', user.verify)

router.route('/')
    .get(user.list)
    .post(user.create)

router.route('/:id')
    .get(user.read)
    .put(permissions.isLogin, user.update)
    .patch(permissions.isLogin, user.update)
    .delete(permissions.isAdmin, user.delete)



/* ------------------------------------------------------- */
module.exports = router