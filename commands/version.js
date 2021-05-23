const pack = require("../package.json");
module.exports = {
    name: "version",
    description: "A command that allows you to see the bot's version.",
    execute(m, args) {
        m.reply("We're currently on version **" + pack.version + "**");
        return;
    }
}