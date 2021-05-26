const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "addcoins",
    description: "Adds coins to someone's balance",
    usage: "$addcoins <@someone> <amount>",
    admin: true,
    execute(m, args) {
        if(!m.member.hasPermission("ADMINISTRATOR")) return m.reply("I don't think you have the facilities for that, big man.");
        if(args.length == 2) {
            if(m.mentions.members.first() != null) {
                let user = m.mentions.members.first().user;
                if(!user.bot) {
                    let balance = profile[user.id].balance;
                    if(Number(args[1]).toString() == "NaN" || Number(args[1]) < 1 ) { return m.reply("Invalid amount of coins."); }
                    profile[user.id].balance = balance+Number(args[1]);
                    m.reply('Added ' + args[1] + ' <:f1coin:834897400610029568> to ' + user.toString() + "'s balance.");
                    writeData();
                }
                return;
            }
            m.reply("Mention someone !");
        }
    },
    getHelp(m) {
        let embed = new MessageEmbed()
            .setTitle("Add Coins Command")
            .addField("Description: ", "This command allows you to add coins to someone's balance.", false)
            .addField("Usage: ", "$addcoins @someone amount")
            .setFooter("This command is an admin-only command.")
            .setColor("RED");
        m.reply(embed);
    }
}