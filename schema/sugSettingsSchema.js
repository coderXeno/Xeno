const mongoose=require("mongoose");

const suggestionsSettingSchema=new mongoose.Schema({
    guildID: String,
    managerRole: String,
    suggestionChannel: String
});

module.exports=new mongoose.model("serverSuggestionSettings",suggestionsSettingSchema);