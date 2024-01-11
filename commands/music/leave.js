const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: "leave",
    description: "leave the voice channel.",
  aliases: ["برا"],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId !== message.member.voice.channelId) return message.reply({ content: `:no_entry_sign: I'm not there already \`${message.member.voice.channel.name}\`` });
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return; 
            let channel = message.member.voice.channel;
            if (!channel) return;
            distube.voices.leave(message.guild)
            return message.reply({ content: `:white_check_mark: Succesfully leave \`${channel.name}\`` });
        } catch (err) {
            console.log(err) 
        }
    },
};