const { EmbedBuilder } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, } = require('discord.js');
const config = require("../../config.json")

module.exports = {
    name: "help",
    description: 'Feeling lost?',
    aliases: [],
      async execute(client, message, args) {
         message.react(`<a:denver_cuteee:1137555753130016950>`)
  const roww = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setLabel('VorRteX')
      .setURL('https://discord.gg/vampires1')
  )
          .addComponents(
    new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setLabel('VorRteX Profile')
      .setURL('https://discord.com/users/1135494721704316990')
  )
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return; 
            if (!message.member.voice.channel) return;    

        const globPromise = promisify(glob);   
        const commandFiles = await globPromise(`${process.cwd()}/commands/music/**/*.js`);

         await message.react('<a:denver_cuteee:1137555753130016950>'); // رمز الرد الذي تريده هنا
        


            let embed = new EmbedBuilder()


      .setTitle(`Music Bot !!`)
      .setColor('2f3136')
      .setDescription(`**__MUSIC COMMANDS__**
**> __play__ [شغل,ش]:  ** Play the song and add it to queue or resume it 
**> __Pause__ [انتظار]: **Pause the song 
**> __Queue__ [قائمه]: **Displays the queue 
**> __Skip__  [تخطي]: **Skip to the next song or any song in queue
**> __Volume__ [صوت]: **Change the volume 
**> __Nowplaying__ [np,الان]: **Displays info about the song 
**> __Loop__ [تكرار]: **Repeat the queue or the song 
**> __Search__ [بحث]**: Search in Youtube


**__OWNER'S COMMANDS__**
**> setname : ** to set bot name 
**> setavatar : **to set avatar bot
**> set-stream : **to set stream bot`);

message.author.send({embeds: [embed], components:[roww]}).catch((err) => {
      console.log(`i couldn't reply to the message: ` + err.message)                      })
    },
};