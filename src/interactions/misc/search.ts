import {
    ActionRowBuilder, 
    StringSelectMenuBuilder,
    EmbedBuilder,
    StringSelectMenuInteraction,
} from "discord.js";

export default {
    name: "search",
    role: "CHAT_INPUT",
    description: "Search for a game using an API.",
    options: [
        {
            type: 3,
            name: "game",
            description: "The game name you want to search for.",
            required: true,
            autocomplete: false,
        },
    ],
    run: async (interaction) => {
        // Define a type for the expected response structure
        interface SearchResult {
            title: string;   
        }

        const gameName = interaction.options.getString("game");
        if (!gameName) {
            const embed = new EmbedBuilder()
                .setColor(0xC2000C)
                .setDescription('Please provide a game name.');
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const option: RequestInit = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer e2a1974678b37386fef69bb3638a1fb36263b78a8be244c04795ada0fa250d3d'
            },
            body: JSON.stringify({ q: gameName, limit: 2, page: 1 })
        };

        try {
            const response = await fetch('https://search.rezi.one/indexes/rezi/search', option);
            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            }
            const data: { hits: Array<SearchResult> } = await response.json();
            const options = data.hits.map((hit, index) => ({
                label: `${index + 1}. ${hit.title}`,
                value: `${index + 1}-${hit.title}`,
            }));

            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId('select-game')
                .setPlaceholder('Select a game')
                .addOptions(options);

            const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenu);

            const embed = new EmbedBuilder()
                .setColor(0x8C2B21)
                .setDescription('Choose a game from the list:');

            await interaction.reply({
                embeds: [embed],
                components: [row],
                ephemeral: true,
            });
        } catch (err) {
            console.error(err);
            await interaction.reply({ content: 'An error occurred during the search.', ephemeral: false });
        }
    },
};

export async function handleSelectMenuInteraction(interaction: StringSelectMenuInteraction) {
    interface SearchResult {
        id: string;
        title: string;
        link: string;
        site: string;
        igdb_url: string;
        system: string;
    }

    if (interaction.customId === 'select-game') {
        const newGame = interaction.values[0].split('-')[1];

        const option: RequestInit = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer e2a1974678b37386fef69bb3638a1fb36263b78a8be244c04795ada0fa250d3d'
            },
            body: JSON.stringify({ q: newGame, limit: 2, page: 1 })
        };

        try {
            const response = await fetch('https://search.rezi.one/indexes/rezi/search', option);
            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            }
            const data: { hits: Array<SearchResult> } = await response.json();

            const gameEmbed = new EmbedBuilder()
                .setColor(0x8C2B21)
                .setTitle(data.hits[0]?.title || 'N/A')
                .setURL(data.hits[0]?.link || 'N/A')
                .addFields(
                    { name: 'Game Name:', value: data.hits[0]?.title || 'N/A', inline: true },
                    { name: 'Download link:', value: data.hits[0]?.link || 'N/A', inline: true },
                    { name: 'IGDB:', value: data.hits[0]?.igdb_url || 'N/A', inline: true },
                    { name: 'Site:', value: data.hits[0]?.site || 'N/A', inline: true },
                    { name: 'Platform/Scene Groups:', value: data.hits[0]?.system || 'N/A', inline: true },
                );

            await interaction.reply({ embeds: [gameEmbed], ephemeral: true });
        } catch (err) {
            console.error(err);
            await interaction.reply({ content: 'An error occurred while retrieving the game details.', ephemeral: true });
        }
    }
}