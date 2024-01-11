const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')

module.exports = {
    name: "jump",
    description: "Skip to a song in the queue.",
    aliases: ['skipto'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return;
            if (!message.member.voice.channel)
                return;
            const queue = distube.getQueue(message)
            if (!queue) return;
            if (!queue.autoplay && queue.songs.length <= 1) return message.reply({ content: `:no_entry_sign:  this is last song in queue list` });
            if (0 <= Number(args[0]) && Number(args[0]) <= queue.songs.length) {
                message.react(`⏭️`)
                return distube.jump(message, parseInt(args[0]))
                    .catch(err => message.reply({ content: `:no_entry_sign: Invalid song number.` }));
            } else {
                message.reply({ content: `:no_entry_sign: Please use a number between **0** and **${queue.songs.length - 1}**` })
            }
        } catch (err) {
            console.log(err) 
        }
    },
};