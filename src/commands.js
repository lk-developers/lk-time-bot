const config = require("../config/config.json");
const timeChannel = require("./timeChannel");

const handle = (msg) => {
    const commands = Object.values(config.COMMANDS);
    const content = msg.content;

    // if this msg is not a command
    if (commands.indexOf(content) == -1) {
        return;
    }

    // if msg member doesn't exist
    if (!msg.member) {
        msg.delete(100);
        return;
    }

    // if non admin ran a command
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete(100);
        return;
    }

    // run relevant command
    switch (content) {
        case config.COMMANDS.SETUP:
            timeChannel.checkExists(msg.guild);
            msg.reply("LKTime will now attempt to setup the clock!").then(m => {
                m.delete(5000);
            }).catch(e => {
                console.log(e);
            });
            msg.delete(10000);
            break;
        default:
            return;
    }
}

module.exports = {
    handle
}