import { readdirSync } from "fs";
import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { Command } from "./types/discord";
import path from "path";
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

export const commands = new Map<string, Command>();

const eventFolders = readdirSync(path.join(process.cwd(), "/src/events"));
for (const folder of eventFolders) {
    switch (folder) {
        case "discord": {
            readdirSync(
                path.join(process.cwd(), `/src/events/${folder}`),
            ).forEach((file) => {
                import(`./events/${folder}/${file}`).then((event) => {
                    event.default(client);
                });
            });
            break;
        }
        default: {
            readdirSync(
                path.join(process.cwd(), `/src/events/${folder}`),
            ).forEach((file) => {
                import(`./events/${folder}/${file}`).then((event) => {
                    event.default();
                });
            });
            break;
        }
    }
}

client.login(process.env.TOKEN);
