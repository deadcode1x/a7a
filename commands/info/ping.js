const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ping",
    description: `Test the bots response time.`,
    async execute(client, message, args) {
        try {
            message.reply({ content: `:ping_pong: Pong ${client.ws.ping} ms` })
        } catch (err) {
            console.log(err)
        }
    },
};