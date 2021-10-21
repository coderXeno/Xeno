const mongoose=require("mongoose");

const suggestionsSchema=new mongoose.Schema({
    guildID: String,
    suggestID: String,
    suggestions: String,
    suggestor: String
});

module.exports=new mongoose.model("serverSuggestion",suggestionsSchema);