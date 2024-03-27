# Discord.JS TypeScript Bot Template

This is a template that people can use to get their Discord bots setup nice and quickly with type safety and a good structure.

With this, there is event and interaction handling, all seperated into different files. It allows for all different types of Discord events to be handled and all different types of interactions to be handled, including autocomplete and modals.

## Setup

1. Clone the repository
2. Run `npm install`
3. Rename `.env.example` to `.env` and fill in the values, CLIENT_ID is theID of your bot and TOKEN is the token of your bot
4. Run `npm run start` to start the bot, if you want the bot to restart on every change, you can do `npm run start:watch`.

## Adding Commands

1. Within the `src/interactions` folder, there is already a `misc` folder which contains all the misc commands I have already catered for. You can add more folders for different categories of commands, but it doesn't really matter, there just needs to be folders to seperate the commands evenly for better command structure
2. Within the folder you want to add a command to, create a new file with the name of the command you want to add for better structure, but yet again it doesn't really matter.
3. In this file you will have to import the `Command` class from `../../types/discord`. For ease of use though, I'd recommend just copying the `help.ts` command and modifying that to your use case.
4. Make sure you set the role correctly and all the relevent values, errors should pop up in your IDE if you get anything wrong. Make sure you have Intellisense enabled in your IDE.
5. Once you have added the command, you just need to start the bot and the command should be available to use.
6. To add stuff that isn't slash commands, you will just need to modify the role, commands have the role of `CHAT_INPUT` by default, but you can change this for whatever case, like `BUTTON` or `SELECT_MENU`

## Adding events

1. Within the `src/events` folder, I have already created a `discord` folder which contains all the discord based events, reason I have done this is to seperate events into different categories for better structure, like if you use Discord-player for example to play music, you may want to put that in the `discord-player` folder instead.
2. Within the folder you want to add an event to, create a new file with the name of the event you want to add for better structure, but yet again it doesn't really matter.
3. From here, setup the events like you usually would, just make sure to export an async function under default that takes the client as a parameter if you're in the Discord folder, this is so that the event can be setup correctly.
4. If you wish to add your own events category, you will need to edit the `src/index.ts` file to cater to that.

## Contributions

If you wish to contribute to this template, feel free to make a pull request and I will review it. If you have any issues, feel free to open an issue and I will try to help you out as best as I can.
