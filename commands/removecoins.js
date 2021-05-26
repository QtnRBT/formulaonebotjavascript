const {MessageEmbed} = require("discord.js");
module.exports = {
    name: "removecoins",
    usage: "$removecoins <@someone> <amount>",
    description: "Removes coins from someone's balance",
    admin: true,
    execute(m, args) {
        if(!m.member.hasPermission("ADMINISTRATOR")) return m.reply("I don't think you have the facilities for that, big man.");
        if(args.length == 2) {
            if(m.mentions.members.first() != null) {
                let user = m.mentions.members.first().user;
                if(!user.bot) {
                    let balance = profile[user.id].balance;
                    if(Number(args[1]).toString() == "NaN" || Number(args[1]) < 1 || balance-Number(args[1]) < 0) { return m.reply("Invalid amount of coins."); }
                    profile[user.id].balance = balance-Number(args[1]);
                    m.reply('Removed ' + args[1] + ' <:f1coin:834897400610029568> from ' + user.toString() + "'s balance.");
                    writeData();
                    return;
                }
                return;
            }
            m.reply("Mention someone !");
        }
    },
    getHelp(m) {
        let embed = new MessageEmbed()
            .setTitle("Remove Coins Command")
            .addField("Description: ", "This command allows you to remove coins from someone's balance.", false)
            .addField("Usage: ", "$removecoins <@someone> <amount>")
            .setFooter("This command is an admin-only command.")
            .setColor("RED");
        m.reply(embed);
    }
}