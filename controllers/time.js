const Moment = require("moment-timezone");
const Config = require("../config/config.json");

// store intervals for each guild
let intervals = {

};

const start = (guild) => {
    // get the time channel
    let timeChannel = guild.channels.find(channel => {
        return channel.parent && channel.parent.name === Config.CAT_NAME;
    });

    if (timeChannel) {
        // update it initially
        update(timeChannel).catch(error => console.log(error));

        // start timer to update it every 20000ms
        intervals[guild] = setInterval(() => {
            update(timeChannel).catch(error => console.log(error));
        }, 20000);
    }    
};

// update time
const update = async (channel) => {
    let time = Moment().tz("Asia/Colombo").format("hh:mm A");
    let updatedChannel = await channel.setName(`🕒 ${time}`);
    return updatedChannel;
};

// delete interval on leaving a guild
const stop = (guild) => {
    clearInterval(intervals[guild]);
    delete intervals[guild];
};

module.exports = {
    start,
    stop
};