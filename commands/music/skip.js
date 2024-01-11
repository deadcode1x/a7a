const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')

module.exports = {
    name: "skip",
    description: "Skip the current song.",
    aliases: ['s', 'التالي', 'تخطي','س','سكب','سكيب'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return;
            if (!message.member.voice.channel)
                return; 
            const queue = distube.getQueue(message)

            if (!queue) return;
           if (!queue.autoplay && queue.songs.length <= 1) { distube.stop(message);
                   message.reply("⏭️ Skipped Successfully")                                          } 
            message.react(`⏭️`)
            return distube.skip(message);
          message.reply("⏭️ Skipped Successfully")        
        } catch (err) {
            console.log(err) 
        }
    },
};