"use strict"
/* -------------------------------------------------------*/
// User Controller:
const User = require('../models/user')
const Token = require('../models/token')
const passwordEncrypt = require('../helpers/passwordEncrypt')
const { token } = require('morgan')

module.exports = {
    list: async (req, res) => {
        
        const data = await res.getModelList(User)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(User),
            data
        })
    },

    create: async (req, res) => {
        // can not create admin:
        req.body.isAdmin = false

        const data = await User.create(req.body)

        /* TOKEN */
        let tokenKey = passwordEncrypt(data._id + Date.now())
        let tokenData = await Token.create({ userId: data._id, token: tokenKey })
        /* TOKEN */

        res.status(201).send({
            error: false,
            token: tokenData.token,
            data
        })
    },

    read: async (req, res) => {
        
        //Filters:
        let filters = {}
        if (!req.user?.isAdmin) filters = { _id: req.user._id }          //---> user eğer Admin değilse; sadece kendi id'si ile ilgili işlem yapabilsin
      
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
            filters = { _id: req.user._id }
            req.body.isAdmin = false                                    //---> kullanıcının kendini admin yapmasının engelledim
        }
                                                                        
        const data = await User.updateOne({ _id: req.params.id, ...filters }, req.body, { runValidators: true })      //---> {hangi kayıt}, neyle güncellenecek, 

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