const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
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