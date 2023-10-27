"use strict"
/* -------------------------------------------------------*/
// Auth Controller:

const User =  require('../models/user')
const Token = require('../models/token')
const passwordEncrypt = require('../helpers/passwordEncrypt')


module.exports = {
   
    login: async (req, res) => {
            const {username, email, password } = req.body
            
            if((username || email) && password) {

                const user = User.findOne({ $or: [{username}, {email}] })  //---> USer tablosundan username'i veya email olan kayıtları getir user'a ata

                if(user && user.password == passwordEncrypt(password)) { //---> kullanıcı var mı VE kullanıcının şifreli password'ü ile şu anda gelen şifreyi crypt edip kıyaslıyorum
                    if(user.isActive){

                        /* TOKEN TIME!! */
                        let tokenData = await Token.findOne({userId : user._id})
                        if(!tokenData){
                            let tokenKey = 

                        }
                    

                    }else{
                        res.errorStatusCode = 401
                        throw new Error('This account is not active...')
                    }

                } else{
                    res.errorStatusCode = 401
                    throw new Error('Wrong username/email and password...')
                }

            }else{
                
                res.errorStatusCode = 401
                throw new Error('Enter username/email and password pls..')
            
            }
    },

    

    logout: async (req, res) => {
        
    }
}