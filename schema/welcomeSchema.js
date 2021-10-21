const mongoose=require("mongoose");

let Schema=new mongoose.Schema({
    guildId: String,
    welcomeMessage: String,
    channelID: String
})

module.exports=mongoose.model('welcomes',Schema)