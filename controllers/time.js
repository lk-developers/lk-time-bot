const Moment = require("moment-timezone");
const Config = require("../config/config.json");

const start = (message) => {
    // get the time channel
    let timeChannel = message.guild.channels.find(channel => {
        return channel.parent && channel.parent.name === Config.CAT_NAME;
    });

    // update it initially
    update(timeChannel);

    // start timer to update it every 20000ms
    setInterval(() => {
        update(timeChannel);
    }, 20000);
};

const update = (channel) => {
    let time = Moment().tz("Asia/Colombo").format("hh:mm A");
    channel.setName(`🕒 ${time}`);
    // console.log(`Time updated to : ${time}`);
};

module.exports = {
    start
};