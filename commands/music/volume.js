const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const db = require(`quick.db`)

module.exports = {
    name: "volume",
    description: "Changes/Shows the current volume.",
    cooldown: 5000,
    aliases: ['vol', 'صوت'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return;
            if (!message.member.voice.channel)
                return; 
            const queue = distube.getQueue(message)
            if (!queue) return; 
            const volume = parseInt(args[0]);
            if (!volume) {
                return message.reply({ content: `:loud_sound: Volume: \`${queue.volume}\`%` });
            }
            if (isNaN(volume)) {
                return message.reply({ content: ':no_entry_sign: Please enter a valid number' });
            }
            if (volume < 0 || volume > 150 || isNaN(volume))
                return message.reply({ content: ":no_entry_sign: **Volume must be a valid integer between 0 and 150!**" })
            if (volume < 0) volume = 0;
            if (volume > 150) volume = 150;
            db.set(`volume_${message.guild.id}`, volume)
            message.reply(`:loud_sound: Volume changed from \`${queue.volume}\` to \`${volume}\``)
            distube.setVolume(message, volume);
        } catch (err) {
            console.log(err) 
        }
    },
};
