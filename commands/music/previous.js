const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')

module.exports = {
    name: "previous",
    description: "Plays the previous song in the queue.",
    aliases: ['prev', 'back','السابق','باك'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return;
            if (!message.member.voice.channel)
                return;
            const queue = distube.getQueue(message)
            if (!queue) return; 
            if (queue.previousSongs.length == 0) {
                message.reply({ content: `:no_entry_sign: There is no previous song in this queue` })
            } else {
            await distube.previous(message);
            message.react(`⏮️`)
            }
        } catch (err) {
            console.log(err) 
        }
    },
};