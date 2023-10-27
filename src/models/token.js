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

const Token = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    token: {
      type: String,
      trim: true,
      required: true,
      index: true                 //---> Sorgularda index'lediğimiz kısımlar hızlanıyor daha hızlı ulaşılıyor. Çok verilirse RAM şişer
    },
  },
  {}
);
