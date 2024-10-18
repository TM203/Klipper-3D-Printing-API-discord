const { Client, GatewayIntentBits } = require('discord.js');

const WOK = require("wokcommands"); // command handler
const path = require("path");
require("dotenv/config");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,           // guild features
        GatewayIntentBits.GuildMessages,    // handling messages
        GatewayIntentBits.MessageContent    // content of messages
    ]
});




client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    new WOK({
        // The client for your bot. This is the only required property
        client,
        // Path to your commands folder
        commandsDir: path.join(__dirname, "commands"),
        // Path to your features folder
        featuresDir: path.join(__dirname, "features"),
        // Configure your event handlers
        events: {
          // Where your events are located. This is required if you
          // provide this events object
          dir: path.join(__dirname, "events"),
          // To learn how to properly configure your events please see
          // https://docs.wornoffkeys.com/events/what-is-a-feature
        },

        // What server IDs are for testing. This is where test
        // only commands are registered to
        testServers: process.env.SERVERS,
        
        // Don't want some of the default commands? Add them here
        disabledDefaultCommands: [
          // DefaultCommands.ChannelCommand,
          // DefaultCommands.CustomCommand,
          // DefaultCommands.Prefix,
          // DefaultCommands.RequiredPermissions,
          // DefaultCommands.RequiredRoles,
          // DefaultCommands.ToggleCommand
        ],
        // Configure the cooldowns for your commands and features
        cooldownConfig: {
          errorMessage: "Please wait {TIME} before doing that again.",
          botOwnersBypass: false,
          // The amount of seconds required for a cooldown to be
          // persistent via MongoDB.
          dbRequired: 300,
        },
        // Dynamic validations
        validations: {
          // Syntax based validations: Ran per command whenever
          // the bot starts up. Useful to throw errors if the
          // syntax of a command is not correct.
          syntax: path.join(__dirname, "validations", "syntax"),
          // Runtime based validations: Ran per command whenever
          // that command is ran. Should return true or false
          // depending on if the command should be ran or not.
          runtime: path.join(__dirname, "validations", "runtime"),
          // For more information on how to configure dyanmic validations
          // please see: TODO: add link
        }
      });
});




// Log in to Discord with your bot's token
client.login(process.env.DISCORDBOTKEY).catch(err => {
    console.error('Failed to log in check your token is valid:', err);
});
