const Discord=require("discord.js");
const Command=require("../structures/Command");

module.exports=new Command({
    name: "xenodetails",
    description: "Take a look at Xeno's details",
    aliases: ["xtd"],
    usage: "<prefix>xenodetails",
    async run(message,args,client){

        const xenoEmbed=new Discord.MessageEmbed()
            .setAuthor("Xeno",client.user.displayAvatarURL({
                dynamic: true
            }))
            .setDescription("Run x.help for more details")
            .addFields(
                {
                    name: "Server Count",
                    value: `${client.guilds.cache.size} Servers`,
                    inline: true
                },
                {
                    name: "Library",
                    value: `discord.js`
                },
                {
                    name: "Version",
                    value: "2.0.1"
                }
            )
            .setColor("DARK_GOLD")
            .setFooter("Buit By Eth")
            .setTimestamp();

        await message.channel.send({
            embeds: [xenoEmbed]
        });
    }
})