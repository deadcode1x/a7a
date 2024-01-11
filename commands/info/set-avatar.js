module.exports = {
  name: "set-avatar",
      aliases: ['sa','setavatar'],
  execute(client, message, args) {
         const config = require("../../config.json")
          let owwneeer = config.owner
    if (!owwneeer.includes(message.author.id)) return;
    if (!args.slice(0).join(" ")) return message.reply("**> Please put an avatar link !**")
    if (!args[0].startsWith("http")) return message.reply("**> Couldn't add this **")
                message.react(config.true)
    client.user.setAvatar(args.slice(0).join(" "))
    message.react(config.true)
  }
}