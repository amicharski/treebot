const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
	.setName('boop')
	.setDescription('Boops the specified user, as many times as you want')
	.addUserOption((option) => option.setName('user').setDescription('The user to boop').setRequired(true))

	// Adds an integer option
	.addIntegerOption((option) =>
		option.setName('boop_amount').setDescription('How many times should the user be booped (defaults to 1)'),
	),

    async execute(interaction){
        let boopString = '';
        let boopAmount;

        if(!interaction.options.getInteger('boop_amount')){
            boopAmount = 1;
        } else if(interaction.options.getInteger('boop_amount') > 3){
            boopAmount = 3;
        }

        for(let i = 0; i < boopAmount; i++){
            boopString += interaction.options.getUser('user').toString() + ' ';
        }

        await interaction.reply(boopString);
    },
}

