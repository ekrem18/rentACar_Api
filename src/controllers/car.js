"use strict"
/* -------------------------------------------------------*/
// Car Controller:
const Reservation = require('../models/reservation')
const Car = require('../models/car')

module.exports = {

    list: async (req, res) => {
        //http://127.0.0.1:8000/cars?start=2023-10-08&end=2023-10-13   QUERY örneğim
        //Filters:
        let filters ={}
        if (!req.user?.isAdmin) filters = { isPublish: true }     //---> admin isPublish T/F hepsini görebiliyorken, admin omayan yalnızca yayında olanları True görsün

        const { start: getStartDate, end:getEndDate } = req.query //---> query'den gelen start'ı getStartDate, end'i de getEndDate  olarak tanımla diyorum

        if(getStartDate && getEndDate ) {
            const reservedCars = await Reservation.find({
                $nor:[
                    { startDate : { $gt : getEndDate } },  //---> 1- iki tane şartım var.kayıtlı rez. tarihinin başlangıç tarihi user'ın bitiş tarihinden büyük olanlar 
                    { endDate : { $lt: getStartDate } }    //---> 2- kayıtlı rez. tarihinin bitiş tarihi de müşteriden gelecek başlangıç tarihten küçük olanlar
                ]                                          //---> 3- yani; 2tarih arasına denk gelecek bir arama filtresini engellemeye çalışıyorum 
            }, {_id: 0, carId:1}).distinct('carId')        //---> 4- Bu şartlar sağlandığında aracı filtrelemede gösterebilirim
                                                           //---> 5- or yerine nor diyerek şartı sağlamayanları getirdim
         console.log(reservedCars);                        //---> distinct('carId') dememin sebebi benzer kayıtları teke düşürüp, Array içerisine aldım. 

        }

        const data = await res.getModelList(Car)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Car),
            data
        })
    },

    create: async (req, res) => {
        
        const data = await Car.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
      
        const data = await Car.findOne({ _id: req.params.id })                                        
        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
                                                                            
        const data = await Car.updateOne({ _id: req.params.id }, req.body, {runValidators: true})    

        res.status(200).send({
            error: false,
            data,
            new: await Car.findOne({_id: req.params.id})
        })
    },

    delete: async (req, res) => {

        const data = await Car.deleteOne({ _id: req.params.id})

        res.status(data.deletedCount ? 204 : 404). send({                   
            error: !data.deletedCount,                                      
            data
        })
    }
}