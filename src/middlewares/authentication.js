"use strict"
/* -------------------------------------------------------*/
// app.use(authentication):

const User =  require('../models/user')
const Token = require('../models/token')

module.exports = async (req, res, next) => {

    // Authorization : Token vcvdgvdfgfgf
    // Authorization : Bearer vcvdgvdfgfgf
    // Authorization : ApiKey vcvdgvdfgfgf
    const auth = req.headers?.authorization || null

    const tokenKey = auth ? auth.split(' ') : null

    if (tokenKey && tokenKey[0] == 'Token') {                                    //---> tokenKey var mı? ve sıfırıncı indeksi Token mı?
        const tokenData = await Token.findOne({token: tokenKey[1]})              //---> Token'ı yakala , ayırdım ya 1.endekste tokenın kendisini al
        if (tokenData) req.user = await User.findOne({ _id: tokenData.userId })  //---> token varsa;  kullanıcım = veritabanındaki _id token ile gelenle aynı olanı al,ata
        
    }

    next()
    
}