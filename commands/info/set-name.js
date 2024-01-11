module.exports = {
  name: "set-name",
        aliases: ['sn','setname'],
  execute(client, message, args) {
             const config = require("../../config.json")
          let owwneeer = config.owner
    if (!owwneeer.includes(message.author.id)) return;
    if (!args.slice(0).join(" ")) return message.reply("**> Please put a name !**")
    client.user.setUsername(args.slice(0).join(" "))
   message.react(config.true)
  }
}