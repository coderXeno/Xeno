const Discord=require("discord.js");
const Command = require("../structures/Command");

module.exports=new Command({
    name: "report",
    description: "Report a bug in the bot to dev",
    usage: "<prefix>report <bug description>",
    async run(message,args,client){
        const reportChannel=client.channels.cache.find(
            (channel)=>channel.id === "900679938720555028"
        );

        if(!args[1])
            message.reply("Please specify the bug you want to report")

        const guild=message.guild;
        const reportEmbed=new Discord.MessageEmbed()
            .setColor("DARK_ORANGE")
            .setTitle("Bugs!")
            .setDescription(`Bug😯: ${args.slice(1).join(" ")}`)
            .addField("Guild",`${message.guild.name}`)
            .addField("Reporter",`${message.author.tag}`)
            .setThumbnail(guild.iconURL({
                dynamic: true
            }))
            .setTimestamp();

        message.channel.send({
            username: message.author.tag,
            avatarURL: message.author.displayAvatarURL({
                dynamic: true
            }),
            embeds: [reportEmbed]
        });

        const bugReportAdded=new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(`Bug Report Added`)
            .setDescription(`The Bug reported by ${message.author.tag} was successfully sent!`)
        message.channel.send({
            embeds: [bugReportAdded]
        })
    }
})