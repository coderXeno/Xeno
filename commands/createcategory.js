const Discord=require("discord.js");
const {Permissions}=require("discord.js");
const Command=require("../structures/Command");
const { run } = require("./ban");

module.exports=new Command({
    name: "createcategory"   ,
    description: "Create a category channel",
    usage: "<prefix>createcategory <name>",
    aliases:["cc"],
    async run(message,args,client){
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))
            return message.channels.send({
                content:
                `You do not have the MANAGE_CHANNELS perissions to run this command`
            });

        const name=args.slice(1).join(" ");
        if(!name)
            return message.channel.send({
                content: `Please provide a name for the category you want to make`
            });

        const newChannel=message.guild.channels.create(`${name}`,{
            type: "GUILD_CATEGORY",
        });

        const embed=new Discord.MessageEmbed()
            .setTitle(`Channel Created`)
            .setDescription(`Created a category channel with the name: ${name}`)
            .setTimestamp()
            .setColor("BLUE")

        message.channel.send({
            embeds: [embed]
        });
    }
})