"use strict"
/* -------------------------------------------------------*/
// Reservation Controller:

const Reservation = require('../models/reservation')

module.exports = {

    list: async (req, res) => {

        const data = await res.getModelList(Reservation, {}, ['userId' , 'carId'])

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Reservation),
            data
        })
    },

    // CRUD:

    create: async (req, res) => {

        const data = await Reservation.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {

        const data = await Reservation.findOne({ _id: req.params.id }).populate(['userId' , 'carId'])

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {

        const data = await Reservation.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(200).send({
            error: false,
            data,
            new: await Reservation.findOne({ _id: req.params.id })
        })
    },

    delete: async (req, res) => {

        const data = await Reservation.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    }

}