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
  ],
  modCommands: [
    "mute",
    "modlogs",
    "hardmute",
    "avatar",
    "ban",
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