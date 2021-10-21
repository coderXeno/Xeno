const mongoose=require("mongoose");

const mutedRoleSchema=new mongoose.Schema({
    guildID: String,
    mutedRole: String
});

module.exports=new mongoose.model("mutedRole",mutedRoleSchema);