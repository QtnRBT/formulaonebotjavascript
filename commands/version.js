const package = require("package.json");

module.exports = {
    name: "version",
    description: "A command that allows you to see the bot's version.",
    execute(msg, args) {
        m.reply("We're currently on version **" + package.version + "**");
        return;
    }
}