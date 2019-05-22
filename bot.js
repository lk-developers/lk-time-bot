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
                Channel.createChannel(message);
                break;
            case "start":
                Time.start(message);
                break;
        }
    }
});

// login to client
client.login(Config.BOT_TOKEN);