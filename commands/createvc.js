const Discord=require("discord.js");
const {Permissions}=require("discord.js");
const Command=require("../structures/Command");
const { run } = require("./purge");

module.exports=new Command({
    name: 'createvc',
    description: "Creates a voice channel",
    usage: "<prefix>createvc name",
    async run(message,args,client){
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))
            return message.channel.send({
                content: `You need the \`MANAGE_CHANNELS\` permission to invoke this command`
            });

        const name=args.slice(1).join("-");
        if(!name)
            return message.channel.send({
                content: `Please provide the name of the voice channel you want to create`
            });

        const newVC=message.guild.channels.create(`${name}`,{
            type: "GUILD_VOICE",
            reason: `Ordered by ${message.author.tag}`,
        });

        const vcEmbed=new Discord.MessageEmbed()
            .setTitle("Created a VC")
            .setDescription(`The new VC created has a name of ${name}`)
            .setTimestamp()
            .setColor("DARK_BLUE")

        message.channel.send({
            embeds: [vcEmbed]
        });
    }
})