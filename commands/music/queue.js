const { EmbedBuilder, MessageFlags } = require("discord.js");
const distube = require('../../client/distube')

module.exports = {
    name: "queue",
    description: "Display the queue of the current tracks in the playlist.",
    aliases: [,'القائمة','الليست','قائمة','ليست'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return;
            if (!message.member.voice.channel)
                return;
            const queue = distube.getQueue(message)
            if (!queue) return; 
            if (!queue.autoplay && queue.songs.length <= 1) return message.reply({ content: `:no_entry_sign:  this is last song in queue list` });
            let curqueue = queue.songs.slice(queue.songs.length / 10).map((song, id) =>
                `**${id + 1}**. [**${song.name}**](${song.url}) - ${song.user.tag}`
            ).join("\n");
            let embed = new EmbedBuilder()
                .setAuthor({ name: `Current Queue: ${queue.songs.length - 1}` })
                .setDescription(`${curqueue}`)
            return message.reply({ embeds: [embed] })
        } catch (err) {
            console.log(err) 
        }
    },
};