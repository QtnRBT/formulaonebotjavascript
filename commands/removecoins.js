module.exports = {
    name: "removecoins",
    description: "Removes coins from someone's balance",
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
    }
}