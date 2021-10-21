const mongoose=require("mongoose");

const roleUser=new mongoose.Schema({
    userID: String,
    guildID: String,
    customRole: String
});

module.exports=new mongoose.model("roleUsers",roleUser);