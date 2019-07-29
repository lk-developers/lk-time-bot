// simple library to send logs to lkdevs discord
const DiscordJs = require("discord.js");

const postLog = (client, log) => {
    const lkDev = client.guilds.get("581163110023430162");
    const channel = lkDev.channels.find(channel => channel.name === "lk-time-bot-log");
    channel.send(log);
}

module.exports = {
    postLog
}