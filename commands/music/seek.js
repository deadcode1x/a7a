const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const { prefix } = require('../../config.json');

module.exports = {
    name: "seek",
    description: "Seeks to a certain point in the current track.",
    aliases: ['تقديم'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return;
            if (!message.member.voice.channel)
                return;
            const queue = distube.getQueue(message)
            if (!queue) return;
            const song = queue.songs[0]
            if (!queue.autoplay && queue.formattedCurrentTime <= song.formattedDuration) return message.reply({ content: `:no_entry_sign:  Max formattedDuration: [${queue.formattedCurrentTime} / ${song.formattedDuration}]` });
            if(!args[0]) return message.reply(`:rolling_eyes: - Example \`${prefix}seek **1**\``)
            message.reply({ content: `:notes: seeked the song for \`${args[0]} seconds\`` })
            return distube.seek(message, Number(args[0] * 1000));
        } catch (err) {
            console.log(err) 
        }
    },
};