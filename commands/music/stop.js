const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')

module.exports = {
    name: "stop",
    description: "Stop the current song and clears the entire music queue.",
    aliases: ['st', 'ايقاف', 'وقف'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return;
            if (!message.member.voice.channel)
                return; 
            const queue = distube.getQueue(message)
            if (!queue) return;
            message.react(`⏹`)
            message.reply({ content: `:stop_button: The player has stopped and the queue has been cleared.` })
            return distube.stop(message);
        } catch (err) {
            console.log(err) 
        }
    },
};