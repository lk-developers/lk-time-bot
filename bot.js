const DiscordJs = require("discord.js");
const Channel = require("./controllers/channel");
const Config = require("./config/config.json");
const Time = require("./controllers/time");

const client = new DiscordJs.Client();

client.on("message", message => {
    // check if user has admin perms
    if (!(message.member && message.member.hasPermission("ADMINISTRATOR"))) {
        return;
    }

    const msgTxt = message.content;
    // check msg start with prefix
    if (msgTxt.startsWith(Config.BOT_PREFIX)) {
        // get command from prefix
        const command = msgTxt.split(" ")[1].toLowerCase().trim();
        // do relevent action to that command
        switch (command) {
            case "setup":
                Channel.create(message.guild).catch(error => console.log(error));
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

    // activity
    updateActivity();
});

// when bot is added to a new server, create a time channel
client.on("guildCreate", (guild) => {
    Channel.create(guild);
    updateActivity();
});

// when bot is removed from a server, update activity
client.on("guildDelete", (guild) => {
    updateActivity();
    Time.stop(guild);
});

const updateActivity = () => {
    client.user.setActivity(`Serving ${client.guilds.size} servers | By ipmanlk@LKDevelopers🇱🇰`);
};

// login to client
client.login(Config.BOT_TOKEN);