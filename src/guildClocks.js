const moment = require("moment-timezone");

// used to keep track of the interval that update time
let timeUpdater = false;

// stores time channel in every guild
const timeChannels = [];

const startClocks = (client) => {
    // find lkclock voice channel in each guild
    client.guilds.forEach(guild => {
        const channels = guild.channels.filter(channel => channel.type == "voice" && channel.parent.name == "TIME IN SRI LANKA");

        // if found add to timeChannels
        if (channels.array().length == 1) timeChannels.push(channels.first());
    });

    // start updating channel names (set to current lk time)
    startTimeUpdater();
}

const updateTime = () => {
    // get current time and format it
    const time = moment().tz("Asia/Colombo").format("hh:mm A");

    // update time for each channel
    timeChannels.forEach(channel => {
        channel.setName(`🕒 ${time}`).catch(e => {
            console.log(e);
        });
    });
}

// add new time channel and start updating it
const addClock = (channel) => {
    if (timeChannels.indexOf(channel) == -1) {
        timeChannels.push(channel);
        if (!timeUpdater) {
            startTimeUpdater();
        }
    }    
}

// remove time channel when bot is removed from a guild
const removeClock = (guild) => {
    timeChannels.every((channel, index) => {
        if (guild.id == channel.guild.id) {
            delete timeChannels[index];
            return false;
        } else {
            return true;
        }
    });

    //  if there are no channels to update
    if (timeChannels.length == 0) {
        stopTimeUpdater();
    }
}

const startTimeUpdater = () => {
    if (timeChannels.length > 0) {
        timeUpdater = setInterval(() => {
            updateTime();
        }, 20000);
    }
}

const stopTimeUpdater = () => {
    clearInterval(timeUpdater);
}

module.exports = {
    startClocks,
    addClock,
    removeClock
}