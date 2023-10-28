"use strict"
/* -------------------------------------------------------*/
// Middleware: permissions

module.exports = {

    isLogin: (req, res, next) => {

        if (req.user && req.isActive) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must LOGIN first !!!')
        }
    },

    isAdmin: (req, res, next) => {

        if (req.user && req.user.isAdmin) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must LOGIN and be ADMIN.')
        }
    },
}