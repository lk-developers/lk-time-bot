const Discord = require("discord.js");
const config = require("./config/config.json");
const guildClocks = require("./src/guildClocks");
const timeChannel = require("./src/timeChannel");
const commands = require("./src/commands");

const client = new Discord.Client();

client.on("ready", () => {
    guildClocks.startClocks(client);
    updateActivity();
});

client.on("message", msg => {
    if (msg.author.bot) return;
    commands.handle(msg);
});

client.on("guildCreate", (guild) => {
    timeChannel.checkExists(guild);
});

client.on("guildDelete", (guild) => {
    guildClocks.removeClock(guild);
});

updateActivity(() => {
    const activityText = `${client.guilds.size} Servers | By LK Developers 🇱🇰 | discord.gg/2PeSHh4`;
    client.user.setActivity(activityText, { type: 'WATCHING' });
});

// login to client
client.login(config.BOT_TOKEN);
