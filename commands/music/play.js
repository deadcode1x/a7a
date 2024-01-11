const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const distube = require('../../client/distube')
const wait = require('node:timers/promises').setTimeout;
const { SearchResultPlaylist } = require("distube");

module.exports = {
    name: "play",
    description: "Add a song to queue and plays it.",
    aliases: ['ش', 'شغل'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return; 
            if (!message.member.voice.channel) return; 

            let player = args.slice(0).join(' ')
            if (!player) return message.reply(`\`Play [ Song Title ]\`**Type Song Name Or Url** \n**\`Play [URL]\` YouTube, SoundCloud, Spotify**`)

            const queue = distube.getQueue(message.id)

            const searchResult = await distube.play(message.member.voice.channel, player, {
                textChannel: message.channel,
                member: message.member,
                message,
            });
            message.react(`<a:VorRteX:1180297707894616074>`)
        } catch (err) {
            console.log(err)
        }
    },
};