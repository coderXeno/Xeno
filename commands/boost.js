const Discord = require("discord.js");
const boostschema = require("../schema/boostNotif");
const { Permissions } = require("discord.js");
const Command=require("../structures/Command");
const { schema } = require("../schema/welcomeSchema");

module.exports = new Command({
    name: 'boost',
    description: "Modify or confirm settings for boost notifications",
    usage: "<prefix>boost <settings | cache | help>",
    async run(message, args, client) {
        const mode = args[1];
        const guildID = message.guild.id;
        const messageChannel = message.channel;
        const boostData = await boostschema.findOne({
            guildID: message.guild.id
        });

        if (!mode)
            return message.channel.send({
                content: `Please specify the mode \`x.boost <settings || cache || help>\``
            });

        if (mode.toLowerCase() == `cache`) {
            if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
                return message.channel.send({
                    content: `You do not have the \`ADMINISTRATOR\` role required to invoke this command`
                });

            if (boostData)
                return message.channel.send({
                    content: `This server is already cached! Run \`x.boost settings\` to view the settings`
                });

            if (!boostData) {
                const msg = await message.channel.reply("Adding server to database");

                await new schema({
                    guildID: message.guild.id,
                    boostChannel: "None",
                    boostMessage: "None"
                }).save();

                setTimeout(() => {
                    msg.edit({
                        content: "Successfully added this server to the database!\n> You can change add a boost channel by doing \`.boost settings Channel <#Channel>\` "
                    });
                }, 5000);
            }
        }

        if (mode.toLowerCase() == "settings") {
            if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
                return message.channel.send({
                    content: `You do not have the \`ADMINISTRATOR\` role required to invoke this command`
                });

            if (!boostData)
                return message.channel.send({
                    content: `This server hasnt been added to the database. Run \`x.boost cache\`for adding it!`
                });

            const settings = args[2];

            if (!settings) {
                const settingEmbed = new Discord.MessageEmbed()
                    .setAuthor(
                        `${message.guild.name} - Settings - Boost Messages`,
                        message.guild.iconURL({
                            dynamic: true
                        })
                    )
                    .setDescription(`Change settings by running \`x.boost settings <setting> <value>\``)
                    .addFields(
                        {
                            name: "Boost Channel",
                            value: `\`\`\`\n${boostData.BoostMessage}\n\`\`\``
                        },
                        {
                            name: "Boost Channel",
                            value: `${boostData.boostChannel}`
                        }
                    )
                    .setFooter(
                        `${message.author.tag}`,
                        message.author.displayAvatarURL({
                            dynamic: true
                        })
                    )
                    .setColor("DARK_VIVID_PINK")
                    .setTimestamp()
            }

            if (settings == "message") {
                const msg = args.slice(3).join(" ");
                if (!msg)
                    return message.channel.send({
                        content: `Please specify a message`
                    });

                await schema.findOneAndUpdate(
                    {
                        guildID: guildID
                    },
                    {
                        boostMessage: msg
                    }
                );

                messageChannel.send({
                    content: `Successfully added the boost message as \n\`\`\`md\n${message}\`\`\``
                });
            }
        }

            if (settings == "channel"){
                const channel = message.mentions.channels.last();
                if (!channel)
                    return message.reply("Specify the channel");

                await schema.findOneAndUpdate(
                    {
                        guildID: guildID
                    },
                    {
                        boostChannel: boostChannel
                    }
                );

                message.channel.send({
                    content: `Successfully added the boost channel to ${channel}`
                });
        }
        if (mode.toLowerCase() == "help") {
            const { pagination } = require("reconlx");

            const helpBEmbed = new Discord.MessageEmbed()
                .setAuthor(`Boost Notifier`, client.user.displayAvatarURL({
                    dynamic: true
                }))
                .setDescription("Boost System")
                .addFields(
                    {
                        name: "Caching",
                        value: "There are 2 things\n `#1)` **Boost Message**\n> Boost messages are the messages that are sent when someone boosts the server. Head over to the next page to see variables that you can use. Command: `.boost settings Message <message>`\n`#2)` **Boost Channel**\n> The channel which the boost message will be sent to! Command: `.boost settings Channel <channel>`"
                    }
                )
                .setColor("DARK_BUT_NOT_BLACK")

            const helpEmbed2 = new Discord.MessageEmbed()
                .setAuthor(
                    `Help - Boost Detectors`,
                    client.user.displayAvatarURL({ dynamic: true })
                )
                .setDescription(
                    "Here are some variables that you can use for `Boost Message` Make sure to use curly brackets!\n\n**{user}** - The person who boosted in a proper format, Example: `BiizoNinja#6969`\n**{user.mention}** - Mentions the user that boosted the server\n**{server}** - The name of the server\n**{boost.count}** - amount of boosts the server has"
                )
                .setColor("DARK_BUT_NOT_BLACK")

            const helpEmbed3 = new Discord.MessageEmbed()
                .setAuthor(
                    `Help - Boost Detectors`,
                    client.user.displayAvatarURL({ dynamic: true })
                )
                .setDescription("Here you can see how to set up settings")
                .setImage(
                    "https://media.discordapp.net/attachments/869823340947316737/869826598147342388/unknown.png?width=747&height=269"
                )
                .setColor("DARK_BUT_NOT_BLACK")

            const helpEmbed4 = new Discord.MessageEmbed()
                .setAuthor(
                    `Help - Boost Detectors`,
                    client.user.displayAvatarURL({ dynamic: true })
                )
                .setDescription("Here is how it will look in Boost Channel.")
                .setImage(
                    "https://media.discordapp.net/attachments/869823340947316737/869827463105101844/unknown.png"
                )
                .setColor("DARK_BUT_NOT_BLACK")
        }
    }
})