const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mutes a particular user')
        .addUserOption((option) => option.setName('user').setDescription('The user to be muted').setRequired(true))
        .addIntegerOption((option) => option.setName('minutes').setDescription('The minutes to be muted'))
        .addIntegerOption((option) => option.setName('hours').setDescription('The hours to be muted'))
        .addIntegerOption((option) => option.setName('days').setDescription('The days to be muted'))
        .addStringOption((option) => option.setName('reason').setDescription('Reason for the mute')),
    async execute(interaction){
        if(!process.env.MUTE_ROLE){
            await interaction.reply('Mute role has not been setup yet');
            return;
        }

        if(!interaction.member.permissions.has([PermissionsBitField.Flags.ManageRoles])){
            await interaction.reply('Insufficient permissions');
            return;
        }

        try {
            await interaction.options.getMember('user').roles.add(process.env.MUTE_ROLE);
            await interaction.reply('Mute successful');
        } catch(err){
            console.error(err);
        }
    },
}