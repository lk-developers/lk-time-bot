const DiscordJs = require("discord.js");
const Channel = require("./controllers/channel");
const Config = require("./config/config.json");
const Time = require("./controllers/time");

const client = new DiscordJs.Client();

client.on("message", message => {
    const msgTxt = message.content;
    // check msg start with prefix
    if (msgTxt.startsWith(Config.BOT_PREFIX)) {
        // get command from prefix
        const command = msgTxt.split(" ")[1].toLowerCase().trim();
        // do relevent action to that command
        switch (command) {
            case "setup":
                Channel.createChannel(message.guild);
                break;
            case "start":
                Time.start(message.guild);
                break;
        }
    }
});

// when bot is ready, update time on current guilds
client.on("ready", () => {
    client.guilds.forEach(guild => {
        Time.start(guild);
    });
});

// when bot is added to a new server, create a time channel
client.on("guildCreate", (guild) => {
    Channel.createChannel(guild);
});

// login to client
client.login(Config.BOT_TOKEN);