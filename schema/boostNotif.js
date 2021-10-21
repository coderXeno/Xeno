const mongoose=require("mongoose");

const boostSchema=new mongoose.Schema({
    guildID: String,
    boostChannel: String,
    boostMessage: String
});

module.exoprts=new mongoose.model("boosters",boostSchema);