const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events,
  EmbedBuilder,
  StringSelectMenuBuilder,
  StringSelectBuilder,
} = require("discord.js");
const client = require("../index");
const config = require("../config.json");
const { DisTube, Song, SearchResultVideo } = require("distube");
const { DeezerPlugin } = require("@distube/deezer");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const wait = require('node:timers/promises').setTimeout;
const { YtDlpPlugin } = require("@distube/yt-dlp");
const db = require(`quick.db`);
const { red } = require("colors");
const PlayerMap = new Map();

let spotifyoptions = {
  parallel: true,
  emitEventsAfterFetching: true,
};
if (config.spotify_api.enabled) {
  spotifyoptions.api = {
    clientId: config.spotify_api.clientId,
    clientSecret: config.spotify_api.clientSecret,
  };
}

const distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnEmpty: false,
  leaveOnFinish: false,
  leaveOnStop: false,
  savePreviousSongs: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: true,
  searchSongs: 0,
  youtubeCookie: config.youtubeCookie,
  nsfw: false,
  emptyCooldown: 0,
  ytdlOptions: {
    highWaterMark: 1024 * 1024 * 64,
    quality: "highestaudio",
    format: "audioonly",
    liveBuffer: 60000,
    dlChunkSize: 1024 * 1024 * 4,
  },
  plugins: [
    new SpotifyPlugin(spotifyoptions),
    new SoundCloudPlugin(),
    new DeezerPlugin(),
  ],
});

const status = (queue) => {
  try {
    `Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode
      ? queue.repeatMode === 2
        ? "All Queue"
        : "This Song"
      : "Off"
      }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\` | Filter: \`${queue.filters.join(", ") || "Off"
      }\``;
  } catch (err) {
    console.log(err);
  }
};



distube.on("initQueue", (queue) => {
  queue.autoplay = false;
  queue.volume = 100;
});

distube.on(`playSong`, (queue, song) => {
  try {
    queue.textChannel.send({
      content: `> <a:VorRteX:1180297707894616074>  *Playing*: **${song.name}** - \`(${song.formattedDuration})\``
    });
    console.log(`playSong ${song.name}`)
  } catch (err) {
    console.log(err);
  }
});


distube.on("addSong", (queue, song) => {
  try {
  queue.textChannel.send({ content: `> <a:VorRteX:1180297707894616074>  *Added* \`${song.name}\` - \`(${song.formattedDuration})\` **to the queue by ${song.user}**` }),
    console.log(`addSong ${song.name}`)
  } catch (err) {
    console.log(err);
  }
});


distube.on("addList", (queue, playlist) => {
  try {
    queue.textChannel.send({ content: `> <a:VorRteX:1180297707894616074>  *Added* \`${playlist.name}\` __**playlist**__ **\`(${playlist.songs.length} songs)\` ** to queue**` }),
    console.log(`addList ${playlist.name} - ${playlist.songs.length}`)
  } catch (err) {
    console.log(err);
  }
});

distube.on("noRelated", (queue) => {
  try {
    queue.textChannel.send({ content: `:rolling_eyes: Can't find related video to play.` });
  } catch (err) {
    console.log(err);
  }
});

distube.on("error", (channel, e) => {
  try {
    var embed = new EmbedBuilder()
      .setAuthor({ name: `Error` })
      .setColor("#470000")
      .setDescription(e);
      if (channel) channel.send({ embeds: [embed] })
  } catch (err) {
    console.log(e);
  }
});

distube.on(`deleteQueue`, (queue) => {
  try {
    console.log(`finish queue`);
  } catch (err) {
    console.log(err);
  }
});

distube.on("finish", (queue) => {
  try {
    console.log(`finish`);
  } catch (err) {
    console.log(err);
  }
});

distube.on(`finishSong`, (queue, song) => {
  try {
    console.log(`finishSong ${song.name}`);
  } catch (err) {
    console.log(err);
  }
});

distube.on("disconnect", (queue) => {
  try {
    console.log(`The voice channel is Disconnected! Leaving the voice channel!`);
  } catch (err) {
    console.log(err);
  }
});

distube.on("empty", (queue) => {
  try {
    console.log(`The voice channel is empty! Leaving the voice channel!`);
  } catch (err) {
    console.log(err);
  }
});

// DisTubeOptions.searchSongs > 1
distube.on("searchResult", (message, result) => {
  try {
    let i = 0;
    message.channel.send({
      embeds: [
        new EmbedBuilder()

          .setDescription(
            `${result
              .map(
                (song) =>
                  `**${++i}**. ${song.name} - \`${song.formattedDuration}\``
              )
              .join("\n")}`
          )
          .setFooter({
            text: `Enter anything else or wait 30 seconds to cancel`,
          }),
      ],
      content: `Choose an option from below`,
    });
  } catch (err) {
    console.log(err);
  }
});

distube.on("searchCancel", (message) => {
  try {
    message.channel.send("Searching canceled");
  } catch (err) {
    console.log(err);
  }
});

distube.on("searchInvalidAnswer", (message) => {
  try {
    message.channel.send("Invalid number of result.");
  } catch (err) {
    console.log(err);
  }
});

distube.on("searchNoResult", (message) => {
  try {
    message.channel.send("No result found!");
  } catch (err) {
    console.log(err);
  }
});

distube.on("searchDone", () => { });

module.exports = distube;