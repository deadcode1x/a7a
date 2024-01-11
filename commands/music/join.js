const { EmbedBuilder } = require("discord.js");
const distube = require('../../client/distube')
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: "join",
    description: "join the voice channel.",
     aliases: ['خش'],
  async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId) return message.reply({ content: `:no_entry_sign: I'm there already \`${message.guild.members.me?.voice?.channel.name}\`` });
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return;
            let channel = message.member.voice.channel;
            if (!channel) return;
            distube.voices.join(channel).then(() => {
                message.reply({ content: `:white_check_mark: Succesfully joined \`${channel.name}\`` });
            }).catch(() => {
                message.reply({ content: `:no_entry_sign: Couldn't join this channel.` });
            })
        } catch (err) {
            console.log(err)
        }
    },
};