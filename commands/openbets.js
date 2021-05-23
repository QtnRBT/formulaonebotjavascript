const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "openbets",
    description: "Allows you to open the bets.",
    execute(m, args) {
        if(!m.member.hasPermission("ADMINISTRATOR")) return m.reply("I don't think you have the facilities for that, big man.");
        if(betState["closed"]) {
            betState["closed"] = false;
            saveBetsSate();
            const embed = new MessageEmbed()
                .setColor("#FFD700")
                .setTitle("Bets Manager")
                .addField("" + m.author.username + " opened the bets.", "\uD83C\uDFB0 Bets are now **opened** !\nYou can place your own by typing **$bet TheCarNumber YourPrice**.\nIf the car you typed wins, you'll gain money based on the betting odds.\nIf you win, your winning will be rounded up to the next integer.\nTo see the odds, just type **$odds**.", false)
                .setFooter("All commands must be typed in #command-bots");
            return m.guild.channels.cache.find(channel => channel.id === "833637998813511720").send(embed);
        }
        return m.reply("Bets are already opened.");
    }
}