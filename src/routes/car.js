"use strict"
/* -------------------------------------------------------*/
const router = require('express').Router()
/* -------------------------------------------------------*/
// routes/car:

const permissions = require('../middlewares/permissions')
const car = require('../controllers/car')

/* -------------------------------------------------------*/
//Upload Files -- Multer MW                            //---> Multer Mw'i nerede aktif ediyorsak çağırıyorsak orada upload etme aktif oluyor
//npm install multer

const multer = require('multer')
const upload = multer({                                 //---> multer'ı çağır diskStorage ayarıyla upload klasörünü ana dizinde oluştur diyorum      
    storage: multer.diskStorage({
        destination: './upload',
        filename: function(req, file, returnCallback){  //---> callback yazıyorum kiiiii,
            returnCallback(null, file.originalname)     //---> upload ettiğimde kafasına göre isimlendirme yapmasın ve belirlediğim ismi girsin ya da şu anki gibi orj. isim
        }
    })
})


// URL: /cars

router.route('/')
    .get(car.list)
  //.post(permissions.isAdmin, upload.single('image'), car.create) //---> Mw olduğu için ortada yazdım ve single yerine array ya da any de kullanabilirim. 
    .post(permissions.isAdmin, upload.array('images'), car.create)  //---> req.files içerisinde gelecek

router.route('/:id')
    .get(car.read)
    .put(permissions.isAdmin, upload.array('images'), car.update)
    .patch(permissions.isAdmin, upload.array('images'), car.update)
    .delete(permissions.isAdmin, car.delete)

/* -------------------------------------------------------*/
module.exports = router