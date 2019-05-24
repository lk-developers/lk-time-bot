const Config = require("../config/config.json");

const createChannel = (guild) => {
    if (!checkChannel(guild)) {
        // create category
        guild.createChannel(Config.CAT_NAME, {
            type: "category"
        }).then((category) => {
            console.log(`${Config.CAT_NAME} Category created!.`);
            // create voice channel
            guild.createChannel("lk-time", {
                type: "voice",
                parent: category
            }).then(() => {
                console.log(`{lk-time} Voice channel created!.`);
                // update permission
                category.overwritePermissions(getRole(guild, "@everyone"), {
                    CONNECT: false,
                }).then(() => {
                    console.log(`{lk-time} Permission updated!.`);

                }).catch((err) => {
                    console.log(`{lk-time} Permission update failed!. ${err}`);
                });

            }).catch((err) => {
                console.log(`{lk-time} Voice channel creation failed!. ${err}`);
            });

        }).catch((err) => {
            console.log(`${Config.CAT_NAME} Category creation failed!. ${err}`);
        });
    }
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
    createChannel
};