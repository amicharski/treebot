const { config } = require('./config');
const { Client, Events, SlashCommandBuilder, Collection, REST, Routes } = require('discord.js');
const chalk = require('chalk');
require('dotenv').config();

const client = new Client({ intents: config.intents });

client.once(Events.ClientReady, c => {
    console.log("Treebot is ready")
});

const ping = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong'),
    async execute(interaction){
        await interaction.reply('Pong!');
    },
};

const roast = {
    data: new SlashCommandBuilder()
        .setName('roast')
        .setDescription('Roasts you when you most expect it'),
    async execute(interaction){
        const random = Math.floor(Math.random() * 14);
        let roastString;
        switch(random){
            case 0: roastString = 'ur mom is gay'; break;
            case 1: roastString = 'stfu furry'; break;
            case 2: roastString = 'ur more annoying than mz'; break;
            case 3: roastString = 'go back to the kitchen'; break;
            case 4: roastString = 'go back to your mediocre slav country'; break;
            case 5: roastString = 'ur more broke than the albanian government'; break;
            case 6: roastString = 'sorry i cant think of a roast, im too distracted by that goofy ass hairline - ThatStaunchPegasus#3393'; break;
            case 7: roastString = 'do your job random'; break;
            case 8: roastString = 'did i say bark'; break;
            case 9: roastString = 'low iq idiot'; break;
            case 10: roastString = 'ur a western soy boy'; break;
            case 11: roastString = 'ur parents must be divorced'; break;
            case 12: roastString = "what's the difference between a theoretical physicist and a mental patient? the physicist gets paid and the mental patient has a chance of recovery - Quantumnessie#6743"; break;
            case 13: roastString = 'get off discord you overweight bastard'; break;
        }
        await interaction.reply(roastString);
    }
}

client.login(process.env.DISCORD_TOKEN);

const commands = [];

commands.push(ping.data);
commands.push(roast.data);

client.commands = new Collection();

client.commands.set(ping.data.name, ping);
client.commands.set(roast.data.name, roast);

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async() => {
    try {
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );
    } catch(error){
        console.error(`Error: ${error}`);
    }
})();

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand())   return;

    const command = client.commands.get(interaction.commandName);

    if(!command){
        console.error(`${interaction.commandName} is an invalid command`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch(error){
        // console.error(`${interaction.commandName} resulted in an error`);
        // console.error(error);
    }
});

client.on(Events.MessageCreate, async message => {
    const triggerRegex = new RegExp(config.triggerWords.join('|'));
    const cmdRegex = new RegExp('^\.(?:' + config.modCommands.join('|') + ')');
    let messageContent = message.content.replace(triggerRegex, triggeredWord => chalk.red(triggeredWord));
    messageContent = message.content.match(cmdRegex) ? chalk.blue(messageContent) : messageContent;

    console.log(`In ${client.channels.cache.get(message.channelId).name}, ${message.author.username}: ${messageContent}`);
});