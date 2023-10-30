"use strict";
/* -------------------------------------------------------*/
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- *
{
    "username": "admin",
    "password": "aA*123456",
    "email": "admin@site.com",
    "firstName": "admin",
    "lastName": "admin",
    "isActive": true,
    "isAdmin": true
}
{
    "username": "test",
    "password": "aA*123456",
    "email": "test@site.com",
    "firstName": "test",
    "lastName": "test",
    "isActive": true,
    "isAdmin": false
}
/* ------------------------------------------------------- */
// User Model:
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    emailVerified:{
      type: Boolean,
      default: false
    },

    firstName: {
      type: String,
      trim: true,
      required: true,
    },

    lastName: {
      type: String,
      trim: true,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "users", timestamps: true }
);                                                         //---> createdAt ve updatedAt timestamps sayesinde mongoose'ca yönetiliyor.

/* ------------------------------------------------------- */
// Schema Configs
const passwordEncrypt = require("../helpers/passwordEncrypt");

//---> (pre save kısmı sadece create için geçerli ama updateOne için de aşağıdaki fonksiyona giriyor) 
UserSchema.pre(['save', 'updateOne'], function(next) {    //---> Kaydetmeden hemen önceki değişklikleri burada düzenliyorum. pre-save kullandığımız zaman arrow func yazmıyoruz

  const data = this?._update || this

  // const emailRegExp = new RegExp("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")
  // const isEmailValidated = emailRegExp.test(data.email)
  // const isEmailValidated = RegExp("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$").test(data.email)  //--->regex yapıldığında yazımı zorlaşıyor. iptal ediyorum
  const isEmailValidated = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) // test from "data".True False döndürür.

  if (isEmailValidated) {

      const isPasswordValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].{8,}$/.test(data.password)
  
      if (isPasswordValidated) {
          
          this.password = data.password = passwordEncrypt(data.password)

          this._update = data //---> updateOne will wait data from "this._update".
          next()              //---> Bu aşamaya geldiysem kayıt tamamdr. Ve bu kısmı MW olarak yazıp alamıyoruz mongoose schema'ya özel bir durum. bu şekilde kullanılmalı
      } else {
          
          next( new Error('Password not validated.') )
      }
  } else {
      
      next( new Error('Email not validated.') )
  }
})
/* ------------------------------------------------------- */
module.exports = mongoose.model('User', UserSchema)


