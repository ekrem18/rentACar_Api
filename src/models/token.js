"use strict";
/* -------------------------------------------------------*/
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- *
{
  "userId": "65343222b67e9681f937f001",
  "token": "...tokenKey..."
}
/* ------------------------------------------------------- */
// Token Model:

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true 
    },

    token: {
      type: String,
      trim: true,
      required: true,
      index: true                 //---> Sorgularda index'lediğimiz kısımlar hızlanıyor daha hızlı ulaşılıyor. Çok verilirse RAM şişer
    },
  },{collectionName: 'tokens', timestamps:true}
);

/* ------------------------------------------------------- */
module.exports = mongoose.model('Token', TokenSchema)