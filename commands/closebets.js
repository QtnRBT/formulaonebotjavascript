const {MessageEmbed} = require('discord.js');
module.exports = {
    name: "closebets",
    usage: "$closebets",
    description: "Allows the admins to close the bets.",
    admin: true,
    execute(m, args) {
        if(!m.member.hasPermission("ADMINISTRATOR")) return m.reply("I don't think you have the facilities for that, big man.");
        if(!betState["closed"]) {
            betState["closed"] = true;
            saveBetsSate();
            return m.guild.channels.cache.find(channel => channel.id === "833637998813511720").send(m.author.toString() + " closed the bets.");
        }
        return m.reply("Bets are already closed.");
    },
    getHelp(m) {
        let embed = new MessageEmbed()
            .setTitle("Close Bets Command")
            .addField("Description: ", "This command allows you to close the bets.", false)
            .addField("Usage: ", "$closebets")
            .setFooter("This command is an admin-only command.")
            .setColor("RED");
        m.reply(embed);
    }
}