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
        
        //Filters:
        let filters = {}
        if (!req.user?.isAdmin) filters = {_id: req.user._id }          //---> user eğer Admin değilse; sadece kendi id'si ile ilgili işlem yapabilsin
      
        const data = await User.findOne({ _id: req.params.id, ...filters })         //---> id'si URL'den gelen id olan kişiyi oku/bul, ve sadece kendi id'sini görebilsin

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
                                                                        //--->  modeldelki validations'ları update için de kullan
        //Filters:
        let filters = {}
        if (!req.user?.isAdmin) {
            filters = {_id: req.user._id } 
            req.body.isAdmin = false                                    //---> kullanıcının kendini admin yapmasının engelledim
        }
                                                                        
        const data = await User.updateOne({ _id: req.params.id }, req.body, {runValidators: true})      //---> {hangi kayıt}, neyle güncellenecek, 

        res.status(200).send({
            error: false,
            data,
            new: await User.findOne({_id: req.params.id})
        })
    },

    delete: async (req, res) => {

        const data = await User.deleteOne({ _id: req.params.id})

        res.status(data.deletedCount ? 204 : 404). send({                   //---> deletedCount data'nın içinde geliyor
            error: !data.deletedCount,                                      //---> silme varsa false, yoksa true
            data
        })
    }
}