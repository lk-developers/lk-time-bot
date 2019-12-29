const guildClocks = require("./guildClocks");
const config = require("../config/config.json");

const checkExists = (guild) => {
    const channels = guild.channels.filter(channel => channel.type == "voice" && channel.parent.name == "TIME IN SRI LANKA");

    if (channels.array().length == 0) {
        // if channel is not found
        createTimeChannel(guild).catch(e => {
            console.log(e);
        });
    } else {
        // start time in existing channel
        guildClocks.addClock(channels.first());
    }
}

const createTimeChannel = async (guild) => {
    const category = await createCategory(guild);
    const channel = await createChannel(guild, category);
    await setCategoryPerms(guild, category);
    // start the clock
    guildClocks.addClock(channel);
}

const createCategory = (guild) => {
    return guild.createChannel(config.CAT_NAME, {
        type: "category",
        position: 1
    });
};

const createChannel = (guild, category) => {
    return guild.createChannel("lk-time", {
        type: "voice",
        parent: category
    });
};

const setCategoryPerms = (guild, category) => {
    return category.overwritePermissions(getRole(guild, "@everyone"), {
        CONNECT: false,
    });
};

// find and return role
const getRole = (guild, roleName) => {
    return guild.roles.find(x => x.name === roleName);
};

module.exports = {
    checkExists
}