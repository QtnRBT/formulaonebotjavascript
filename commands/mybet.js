const {MessageEmbed} = require("discord.js");
module.exports = {
    name: "mybet",
    usage: "$mybet",
    description: "Allows you to see your current bet",
    admin: false,
    execute(m, args) {
        let userId = m.author.id;
        if(bets[userId] != null) {
            if(bets[userId].length == 2) {
                let bet = bets[userId];
                m.reply("You have bet " + bet[1] + " <:f1coin:834897400610029568> on the car N°" + bet[0] + ".");
                return;
            } else {
                let bet = bets[userId];
                m.reply("You have bet " + bet[3] + " <:f1coin:834897400610029568> on the following podium : \n- 1rst: N°" + bet[0] + "\n- 2nd: N°" + bet[1] + "\n- 3rd: N°" + bet[2]);
                return;
            }
        }
        return m.reply("You have not bet yet.");
    },
    getHelp(m) {
        let embed = new MessageEmbed()
            .setTitle("My Bet Command")
            .addField("Description: ", "This command allows you to see your latest bet.", false)
            .addField("Usage: ", "$mybet")
            .setFooter("Anybody can use this command.")
            .setColor("GREEN");
        m.reply(embed);
    }
}