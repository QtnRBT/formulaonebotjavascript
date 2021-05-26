const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "shop",
    usage: "$shop",
    description: "A command that allows you to see the shop",
    admin: false,
    execute(msg, args) {
        let emojiText = "";
        let rolesText = "";
        for(const emoji of shop.emojis) {
            if(profile[msg.member.id].inventory.includes(emoji.name)) {
                emojiText += emoji.id + " " + emoji.name + " : ✅\n"
            } else if (msg.member.roles.cache.get("844944728885690419")) {
                emojiText += emoji.id + " " + emoji.name + " : ~~" + emoji.price + "~~ " + Math.round(emoji.price/2) + " <:f1coin:834897400610029568>\n"
            } else {
                emojiText += emoji.id + " " + emoji.name + " : " + emoji.price + " <:f1coin:834897400610029568>\n"
            }
        }
        for(const role of shop.roles) {
            if(msg.member.roles.cache.get(role.roleId)) {
                rolesText += role.id + " " + msg.guild.roles.cache.get(role.roleId).toString() + " : ✅\n"
            } else {
                rolesText += role.id + " " + msg.guild.roles.cache.get(role.roleId).toString() + " : " + role.price + "<:f1coin:834897400610029568>\n"
            }
        }
        let embed = new MessageEmbed()
            .setTitle("F1 Lovers Shop")
            .addField("Emojis", emojiText, false)
            .addField("Roles", rolesText, false)
            .setFooter("You can buy anything using the command $buy <the number of what you want to buy>");

        msg.reply(embed);
    },
    getHelp(m) {
        let embed = new MessageEmbed()
            .setTitle("Shop Command")
            .addField("Description: ", "This command allows you to see the shop.", false)
            .addField("Usage: ", "$shop")
            .setFooter("Anybody can use this command.")
            .setColor("GREEN");
        m.reply(embed);
    }
}