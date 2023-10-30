"use strict"
/* ------------------------------------------------------- */
// Reservation Controller:

const Reservation = require('../models/reservation')

module.exports = {

    list: async (req, res) => {

        // Filters:
        let filters = {}      //filters = { userId : req.user._id}
        if (!req?.user.isAdmin) filters.userId = req.user._id   // Admin harici kullanıcılar, sadece kendi kayıtlarını görmke için filtreleme

        const data = await res.getModelList(Reservation, filters, ['userId', 'carId'])

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Reservation, filters),
            data
        })
    },

    // CRUD:

    create: async (req, res) => {

        req.body.userId = req?.user._id;   // yeni rez oluştururken id girmek zorunda kalmamak için oto. olarak id'yi yapıştır diyorum

        const userReservationInDates = await Reservation.findOne({  //---> Rez. sırala peki hangilerini
            userId: req.body.userId,                        //---> req body den gelen kullanıcıya ait
            $nor: [                                         //---> çakışma yakalamak istiyorsam genel yapıo bu aslında
                { startDate: { $gt: req.body.endDate } },
                { endDate: { $lt: req.body.startDate } }
            ]
        })

        if (userReservationInDates) {

            res.errorStatusCode = 400
            throw new Error(
                "It's not possible to make a reservation for the same date.",
                { cause: { userReservationInDates: userReservationInDates } }  //---> hata geldiğinde de mevcut olanı göstermek için cause ekliyorum
            )
        } else {
            
            const data = await Reservation.create(req.body)

            res.status(201).send({
                error: false,
                data
            })
        }
    },

    read: async (req, res) => {

        // Filters:
        let filters = {}
        // Only self records. except admin:
        if (!req?.user.isAdmin) filters.userId = req.user._id

        const data = await Reservation.findOne({ _id: req.params.id, ...filters }).populate(['userId', 'carId'])

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