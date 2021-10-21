const Discord=require("discord.js");
const Command=require("../structures/Command");
const {Permissions}=require("discord.js");

module.exports=new Command({
    name: "ban",
    description:"bans a member",
    usage:"<mention||userID> <reason for ban>",
    async run(message,args,client){
        const target=message.mentions.members.first();
        if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
            return message.channel.send({
                content: "Sorry! You need the proper authority to use this command"
            });

        if(!target)
            return message.channel.send({
                content: `Please mention a user to ban`
            });

        if(!target.bannable)
            return message.channel.send({
                content: `That user cant be banned`
            });

        if(target.id===message.author.id)
            return message.channel.send({
                content: "You cant ban yourself"
            });

        if(target==message.guild.owner)
            return message.channel.send({
                content: "Bruh! That is the server owner!"
            });

        const reasonForBan=args.slice(2).join(" ")||"A reason wasnt provided for the ban";
        const targetMember=message.guild.members.cache.get(target.id);

        await targetMember.ban({
            days:0,
            reason: `Ban Ordered by ${message.author.tag}, the reason being: ${reasonForBan}`
        });

        const embed=new Discord.MessageEmbed()
            .setDescription(`Banned ${target.id}, for the reason being ${reasonForBan}`)
            .setTimestamp()
            .setColor(`RED`)
        message.channel.send({
            embeds: [embed]
        });
        
        target.send({
            content: `You have been banned from ${message.guild.name} for ${reasonForBan} by ${message.author.tag}`
        })
    }
})