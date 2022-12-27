const { GatewayIntentBits } = require("discord.js");

const config = {
  intents: [ 
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  muteRole: "927018179232956436",
  triggerWords: [
    "suicide",
    "kill",
    "sex",
    "pussy",
    "vagina",
    "penis",
    "dick",
    "anal",
    "anus",
    "die",
    "jew",
    "hitler",
    "cunt",
    "nuke",
    "cum",
    "white",
    "black",
  ],
  modCommands: [
    "mute",
    "unmute",
    "modlogs",
    "hardmute",
    "avatar",
    "ban",
    "unban",
    "warn",
    "purge",
    "massban",
    "tempban",
    "bam",
    "bañ",
    "poll",
  ]
};

module.exports = { config };