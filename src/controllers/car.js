"use strict"
/* -------------------------------------------------------*/
// Car Controller:

const Car = require('../models/car')

module.exports = {

    list: async (req, res) => {
        //Filters:
        let filters ={}
        if (!req.user?.isAdmin) filters = { isPublish: true }     //---> admin isPublish T/F hepsini görebiliyorken, admin omayan yalnızca yayında olanları True görsün

        const { start: getStartDate, end:getEndDate } = req.query //---> query'den gelen start'ı getStartDate, end'i de getEndDate  olarak tanımla diyorum

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