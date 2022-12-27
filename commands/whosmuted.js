const { SlashCommandBuilder, PermissionsBitField, messageLink } = require('discord.js');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whosmuted')
        .setDescription('Generates a list of every muted user'),
    async execute(interaction){
        if(!process.env.MUTE_ROLE){
            await interaction.reply('Mute role has not been setup yet');
            return;
        }

        console.log(interaction.member);



        if(!(interaction.member.permissions.has([PermissionsBitField.Flags.ManageRoles]) || interaction.member)){
            await interaction.reply('Insufficient permissions');
            return;
        }

        try {
            let msg = '';

            (await interaction.member.guild.members.fetch()).forEach(member => {
                member._roles.forEach(role => {
                    if(role === process.env.MUTE_ROLE){
                        msg += member + '\n';
                    }
                })
            });
            console.log(msg)

            await interaction.reply('check debugger');
            return;
        } catch(err){
            console.error(err);
        }
    },
}