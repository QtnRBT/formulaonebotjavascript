const pack = require("../package.json");
const {MessageEmbed} = require("discord.js");
module.exports = {
    name: "version",
    usage: "$version",
    description: "A command that allows you to see the bot's version.",
    admin: false,
    execute(m, args) {
        m.reply("We're currently on version **" + pack.version + "**");
        return;
    },
    getHelp(m) {
        let embed = new MessageEmbed()
            .setTitle("Version Command")
            .addField("Description: ", "This command allows you to see the current bot's version.", false)
            .addField("Usage: ", "$version")
            .setFooter("Anybody can use this command.")
            .setColor("GREEN");
        m.reply(embed);
    }
}