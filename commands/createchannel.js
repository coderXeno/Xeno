const Discord=require("discord.js");
const {Permissions}=require("discord.js");
const Command=require("../structures/Command");
const { run } = require("./ban");

module.exports=new Command({
    name: "createchannel",
    description: "Creates a text channel",
    usage: "<prefix>createchannel <name>",
    aliases: ["crch"],
    async run(message,args,client){
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))
            return message.channels.send({
                content: `You do not have the \`MANAGE_CHANNELS\` permission required to invoke this command`
            });

        const name=args.slice(1).join("-");
        if(!name)
            return message.channel.send({
                content: `Please provide the name of the channel that you want to make`
            });

        const newChannel=message.guild.channels.create(`${name}`,{
            type: `GUILD_TEXT`
        });

        const channelEmbed=new Discord.MessageEmbed()
            .setTitle(`Channel Created`)
            .setDescription(`Created a text channel with the name: ${name}`)
            .setColor("DARK_BLUE")

        message.channel.send({
            embeds: [channelEmbed]
        })
    }
})