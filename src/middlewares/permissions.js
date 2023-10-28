"use strict"
/* -------------------------------------------------------*/
// Middleware: permissions

module.exports = {

    isLogin: (req, res, next) => {

        if (req.user && req.user.isActive) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must LOGIN first !!!')
        }
    },

    isAdmin: (req, res, next) => {
        // only Admin:
        if (req.user && req.user.isActive && req.user.isAdmin) {

            next()

        } else {

            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login and to be Admin.')
        }
    },
}