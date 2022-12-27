const { config } = require('./config');
const { Client, Events, Collection, REST, Routes } = require('discord.js');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const Surreal = require('surrealdb.js').default;
require('dotenv').config();

const client = new Client({ intents: config.intents });
const db = new Surreal('http://localhost:8000/');

(async() => {
    try {
        await db.signin({
            user: 'root',
            pass: 'root'
        });
    
        await db.use('political_debate', 'dev');
    } catch(err){
        console.error(err);
    }
})();

client.once(Events.ClientReady, c => {
    console.log("Treebot is ready")
});

client.login(process.env.DISCORD_TOKEN);

const commands = [];
client.commands  = new Collection();

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(path.join(__dirname, 'commands', file));
    if (command.data && command.execute) {
        client.commands.set(command.data.name, command);
        commands.push(command.data);
    }
    else {
        console.error(`Command ${file} is missing either data or execute properties`);
    }
}

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
    try {
        const triggerRegex = new RegExp(config.triggerWords.join('|'));
        const cmdRegex = new RegExp('^\.(?:' + config.modCommands.join('|') + ')');
        let messageContent = message.content.replace(triggerRegex, triggeredWord => chalk.red(triggeredWord));
        messageContent = message.content.match(cmdRegex) ? chalk.blue(messageContent) : messageContent;

        await db.create('message', {
            content: message.content,
            channel: message.channelId,
            author: message.author.username,
            timestamp: message.timestamp,
        }).then(() => {
            console.log(`In ${client.channels.cache.get(message.channelId).name}, ${message.author.username}: ${messageContent}`);
        });
    } catch(err){
        console.log(err);
    }
});