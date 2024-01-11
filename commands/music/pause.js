const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const { prefix } = require('../../config.json');

module.exports = {
    name: "pause",
    description: "Pauses the currently playing track.",
    aliases: ['استئناف' , 'انتظار '],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return;
            if (!message.member.voice.channel)
                return;
            const queue = distube.getQueue(message)
            if (!queue) return; 
            const song = queue.songs[0]
            let name = song.name
            if (queue.paused) {
                message.reply({ content: `:no_entry_sign: **${name}** has been Paused!` })
            } else {
                distube.pause(message);
                message.react(`⏸️`)
                message.reply({ content: `:pause_button: Paused **${name}** . Type \`${prefix}resume\` to unpause!` })
            }
        } catch (err) {
            console.log(err) 
        }
    },
};
