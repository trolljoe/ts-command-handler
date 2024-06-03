import { Client, Interaction } from "discord.js";
import { commands } from "../..";
import { handleSelectMenuInteraction } from "../../interactions/misc/search";


export default async function (client: Client) {
    client.on("interactionCreate", async (interaction: Interaction) => {
        let finder: string;

        if (interaction.isCommand()) {
            finder = interaction.commandName;
        } else if (interaction.isAutocomplete()) {
            finder = `${interaction.commandName}-autocomplete`;
        } else if (interaction.isStringSelectMenu()) {
            await handleSelectMenuInteraction(interaction);
            return;
        } else {
            return;
        }

        const command = commands.get(finder);
        if (!command) return;

        try {
            await (command.run as (interaction: Interaction) => unknown)(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.isCommand()) {
                await interaction.reply({
                    content: "There was an error while executing this command!",
                    ephemeral: true,
                });
            }
        }
    });
}
