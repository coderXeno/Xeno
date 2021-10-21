const Discord=require('discord.js');
const config=require('./data/config.json');
const intents=new Discord.Intents(32767);
const fs=require("fs");
const Client=require("./structures/Client");
const Command = require('./structures/Command');
const mongoose=require("mongoose");
const schema=require("./schema/boostNotif");

mongoose.connect('mongodb+srv://ethXeno:xeno2021@xeno.6lxkx.mongodb.net/test',{
    useUnifiedTopology: true
}).then(console.log('Connected to Mongoose'))

const client=new Client();
client.aliases= new Discord.Collection();

fs.readdirSync("../src/commands")
  .filter(file => file.endsWith(".js"))
  .forEach(file=>{
      /**
       * @type {Command}
       */
      const command=require(`./commands/${file}`)
      console.log(`Command ${command.name} loaded`)
      client.commands.set(command.name,command);
    })

client.on("ready",async ()=>{
    console.log("Xeno is back in a new form!!");
    client.user.setActivity("x.help | x.info", {
        type: "LISTENING"
    })
});

client.on("messageCreate",message=>{
    // console.log(message.content);
    // if(message.content=="sup")  message.reply("Yo")
    if(message.author.bot)  return;
    
    if(!message.content.startsWith(config.prefix))  return;

    const args=message.content.substring(config.prefix.length).split(/ +/);
    const command=client.commands.find(cmd=>cmd.name ==args[0]);
    if(!command)    
        return message.reply(`${args[0]} is not a valid command! Run x.help for the commands`);
    command.run(message,args,client);
});

const welcomeSchema = require('./schema/welcomeSchema');
const { builtinModules } = require('module');
client.on("guildMemberAdd",async(member,guild)=>{
    welcomeSchema.findOne({
        guildID: member.guild.id
    },async (err,data)=>{
        if(!data)
            return;
        
        const user=member.user;
        const channel=member.guild.channels.cache.get(data.channelID);
        const wmsg=data.welcomeMsg;

        channel.send(`Welcome aboard ${user}`+ wmsg);
    })
});

client.on("guildMemberUpdate",async (oldMember,newMember)=>{
    const oldStatus=oldMember.premiumSince;
    const newStatus=newMember.premiumSince;
    const guild=newMember.guild;

    const boostData=await schema.findOne({
        guildID: guild.id
    });

    if(!boostData)
        return;

    if(!oldStatus && newStatus){
        if(boostData.boostChannel=="None")
            return;
        if(boostData.boostMessage=="None")
            return;

        const bstChannel=guild.channels.cache.get(boostData.boostChannel);
        const bstMessage=boostData.boostMessage;

        const msg=bstMessage
            .replace(/{server}/g,guild.name)
            .replace(/{user}/g,newMember.user.tag)
            .replace(/{user.mention}/g,`<@${newMember.user.id}>`)
            .replace(/{boost.count}/g,guild.premiumSubscriptionCount);

        bstChannel.send({
            content: msg
        });
    }   

    if(oldStatus && newStatus)
        return;
})

client.on("guildCreate",(guild)=>{
    const channel=guild.channels.cache.find(
        (channel)=>{
            channel.type==="text" && channel.permissionsFor(guild.me).has("SEND_MESSAGES")
        }
    );

    if(!channel)
        return;

    const guildEmbed=new Discord.MessageEmbed()
        .setAuthor(guild.name,guild.iconURL({
            dynamic: true
        }))
        .setTitle("Done!")
        .setDescription(`Sup people! This is Xeno. I have been built by Eth#2435`)
        .setColor("DARK_VIVID_PINK")
        .setFooter("Message Eth#2435 for any help needed for the bot")
        .setTimestamp();

    message.channel.send({
        embeds: [guildEmbed]
    });
});

client.login(config.token);