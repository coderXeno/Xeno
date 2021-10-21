const mongoose=require("mongoose");

const logSchema=new mongoose.model({
    guildID: String,
    logChannel: String
});

module.exports=new mongoose.model('logChannel',logSchema);