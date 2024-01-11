const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const db = require(`quick.db`)

module.exports = {
    name: "repeat",
    description: "Toggles the repeat mode.",
    aliases: ['loop', 'تكرار','كرر'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return;
            if (!message.member.voice.channel)
                return;
            const queue = distube.getQueue(message)
            if (!queue) return;
            if (0 <= Number(args[0]) && Number(args[0]) <= 2) {
                distube.setRepeatMode(message, parseInt(args[0]))
                message.reply({ content: `:notes: **Repeat mode set to:** ${args[0].replace("0", "\`OFF\`").replace("1", "\`Repeat song\`").replace("2", "\`Repeat Queue\`")}` })
            } else {
                message.reply({ content: `:no_entry_sign: Please use a number between **0** and **2**   |   0: **disabled**, 1: **Repeat a song**, 2: **Repeat all the queue**` })
            }
        } catch (err) {
            console.log(err) 
        }
    },
};