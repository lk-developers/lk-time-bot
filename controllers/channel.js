const Config = require("../config/config.json");
const Time = require("./time");

const create = async (guild) => {
    try {
        // check if channel already exist
        if (checkChannel(guild)) {
            Time.start(guild);
            return;
        }
        // else create 
        const category = await createCategory(guild);
        if (category) {
            console.log(`{${guild.name}} ${Config.CAT_NAME} Category created!.`);
    
            const channel = await createChannel(guild, category);
            if (channel) {
                console.log(`{${guild.name}} Voice channel created!.`);
    
                const perms = await setCategoryPerms(guild, category);
                if (perms) {
                    console.log(`{${guild.name}} Permission updated!.`);
                } else {
                    console.log(`{${guild.name}} Permission update failed!.`);
                }
            } else {
                console.log(`{${guild.name}} Voice channel creation failed!.`);
            }
        } else {
            console.log(`{${guild.name}} ${Config.CAT_NAME} Category creation failed!.`);
        }
    } catch (err) {
        console.log(err);
    }
};

// create category
const createCategory = (guild) => {
    return guild.createChannel(Config.CAT_NAME, {
        type: "category",
        position: 1
    });
};

// create channel
const createChannel = (guild, category) => {
    return guild.createChannel("lk-time", {
        type: "voice",
        parent: category
    });
};

// set category permissions
const setCategoryPerms = (guild, category) => {
    return category.overwritePermissions(getRole(guild, "@everyone"), {
        CONNECT: false,
    });
};

// check channel cat exists
const checkChannel = (guild) => {
    return guild.channels.find(channel => {
        return channel.parent && channel.parent.name === Config.CAT_NAME;
    });
};

// find and return role
const getRole = (guild, roleName) => {
    return guild.roles.find(x => x.name === roleName);
};

module.exports = {
    create
};