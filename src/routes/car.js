"use strict"
/* -------------------------------------------------------*/
const router = require('express').Router()
/* -------------------------------------------------------*/
// routes/car:

const permissions = require('../middlewares/permissions')
const car = require('../controllers/car')

/* -------------------------------------------------------*/
//Upload Files -- Multer MW                             ---> Multer Mw'i nerede aktif ediyorsak çağırıyorsak orada upload etme aktif oluyor
//npm install multer

const multer = require('multer')
const upload = multer({             //---> multer'ı çağır diskStorage ayarıyla upload klasörünü ana dizinde oluştur diyorum      
    storage: multer.diskStorage({
        destination: './upload'
    })
})



// URL: /cars

router.route('/')
    .get(car.list)
    .post(permissions.isAdmin, car.create)

router.route('/:id')
    .get(car.read)
    .put(permissions.isAdmin, car.update)
    .patch(permissions.isAdmin, car.update)
    .delete(permissions.isAdmin, car.delete)

/* -------------------------------------------------------*/
module.exports = router