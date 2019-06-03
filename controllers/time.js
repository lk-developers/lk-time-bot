const Moment = require("moment-timezone");
const Config = require("../config/config.json");

const start = (guild) => {
    // get the time channel
    let timeChannel = guild.channels.find(channel => {
        return channel.parent && channel.parent.name === Config.CAT_NAME;
    });

    if (timeChannel) {
        // update it initially
        update(timeChannel).catch(error => console.log(error));
    
        // start timer to update it every 20000ms
        setInterval(() => {
            update(timeChannel).catch(error => console.log(error));
        }, 20000);
    }
};

const update = async(channel) => {
    let time = Moment().tz("Asia/Colombo").format("hh:mm A");
    let updatedChannel = await channel.setName(`🕒 ${time}`);
    return updatedChannel;
};

module.exports = {
    start
};