const { prefix } = require('../config.json');
const { Collection } = require('discord.js');
const delay = new Collection();
const db = require('quick.db');
const ms = require('ms');
const axios = require("axios").default;
const { Utils } = require("devtools-ts");
const utilites = new Utils();
module.exports = {
  name: 'messageCreate',
  async execute(client, message) {
    try {
      if (message.content.startsWith(prefix) || message.content.startsWith(`<@${client.user.id}>`) || message.content.startsWith(`<@!${client.user.id}>`)) {
        let args = message.content.slice(prefix.length).split(/ +/);
        let mention = message.mentions.users.first();
        if (mention && mention.id == client.user.id) args = message.content.slice(`<@!${client.user.id}>`.length).split(/ +/);
        let command = args.shift().toLowerCase();

        try {
          let commandFile = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

          if (!commandFile) return;

          if (commandFile.cooldown) {
            if (delay.has(`${commandFile.name}-${message.author.id}`)) {
              return message.reply(`You can use this command again after **${ms(delay.get(`${commandFile.name}-${message.author.id}`) - Date.now(), { long: true }).includes('ms') ? '0 second' : ms(delay.get(`${commandFile.name}-${message.author.id}`) - Date.now(), { long: true })}**`);
            }

            commandFile.execute(client, message, args);

            delay.set(`${commandFile.name}-${message.author.id}`, Date.now() + commandFile.cooldown);
            setTimeout(() => {
              delay.delete(`${commandFile.name}-${message.author.id}`);
            }, commandFile.cooldown);
          } else {
            commandFile.execute(client, message, args);
          }
        } catch (error) {
          console.error(error);
          message.reply('There was an error trying to execute that command!');
        }
      }
    } catch (err) {
      utilites.logger(err);
    }
  }
}