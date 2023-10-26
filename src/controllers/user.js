"use strict"
/* -------------------------------------------------------*/
// User Controller:

const User = require('../models/user')

module.exports = {
    list: async (req, res) => {
        
        const data = await res.getModelList(User)

        res.status(200).send({
            error: false,
            details: await res.getModelList(User),
            data
        })
    },

    create: async (req, res) => {
        
        const data = await User.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
      
        const data = await User.findOne({ _id: req.params.id })                                         //---> id'si URL'den gelen id olan kişiyi oku/bul

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
                                                                            //->validations'ları update için de kullan
        const data = await User.updateOne({ _id: req.params.id }, req.body, {runValidators: true})      //---> {hangi kayıt}, neyle güncellenecek, 

    }
}