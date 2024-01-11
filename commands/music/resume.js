const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')

module.exports = {
    name: "resume",
    description: "Resumes the currently paused track.",
  aliases: ['اكمل', 'كمل'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return;
            if (!message.member.voice.channel)
                return; 
            const queue = distube.getQueue(message)
            const song = queue.songs[0]
            let name = song.name
            if (!queue) return; 
            message.react(`▶️`)
            message.reply(`:arrow_forward: Resumed **${name}**.`)
            return distube.resume(message);
        } catch (err) {
            console.log(err) 
        }
    },
};