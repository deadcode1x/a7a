    const { EmbedBuilder } = require("discord.js");
    const distube = require('../../client/distube')
    
    module.exports = {
        name: "autoplay",
        description: "Toggles autoplay for the current guild.",
        aliases: ['ap', 'اوتو'],
        async execute(client, message, args) {
            try {
                const queue = distube.getQueue(message)
                if (!queue) return;
                if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return; 
                if (!message.member.voice.channel)
                    return;
                const mode = distube.toggleAutoplay(message)
//            message.reply(":white_check_mark: Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
                if (!queue.autoplay) {
                    message.reply({ content: `:white_check_mark: AutoPlay: **\`${queue.autoplay ? "On" : "Off"}\`**` })
                } else {
                    message.reply({ content: `:white_check_mark: AutoPlay: **\`${queue.autoplay ? "On" : "Off"}\`**` })
                }
            } catch (err) {
                console.log(err) 
            }
        },
    };