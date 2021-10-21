const mongoose=require("mongoose");

const roleSchema=new mongoose.Schema({
    guildID: String,
    minPos: Number,
    maxPos: Number,
    allowedRole: String
});

module.exports=new mongoose.model("roleSchema",roleSchema)