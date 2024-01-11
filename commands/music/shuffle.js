const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')

module.exports = {
    name: "shuffle",
    description: "Shuffle the queue.",
    async execute(client, message) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return message.reply({ content: `:no_entry_sign: You must be listening in \`${message.guild.members.me?.voice?.channel.name}\` to use that!` });
            if (!message.member.voice.channel)
                return message.reply({ content: ":no_entry_sign: You must join a voice channel to use that!" })
            const queue = distube.getQueue(message)
            if (!queue) return message.reply({ content: `:no_entry_sign: There must be music playing to use that!` })
            if (!queue.autoplay && queue.songs.length <= 1) return message.reply({ content: `:no_entry_sign:  this is last song in queue list` });
            message.react(`🔀`)
            message.reply({ content: `:white_check_mark: Song has been: \`Shuffle ${queue.songs.length - 1}\`` })
            return     queue.shuffle()
            ;
        } catch (err) {
            console.log(err) 
        }
    },
};