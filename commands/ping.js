const {MessageEmbed} = require("discord.js");
module.exports = {
    name: "ping",
    usage: "$ping",
    description: "A simple ping command",
    admin: false,
    execute(message, args) {
        message.reply("Pong :ping_pong:");
    },
    getHelp(m) {
        let embed = new MessageEmbed()
            .setTitle("Ping Command")
            .addField("Description: ", "This command allows you to see if the bot works.", false)
            .addField("Usage: ", "$ping")
            .setFooter("Anybody can use this command.")
            .setColor("GREEN");
        m.reply(embed);
    }
}