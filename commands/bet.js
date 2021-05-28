const fs = require('fs');
const {MessageEmbed} = require("discord.js");
module.exports = {
    name: "bet",
    description: "Allows you to bet basically",
    usage: "$bet <carNumber> <price>",
    admin: false,
    execute(m, args) {
        if(args.length == 2) {
            let carNumber = args[0];
            let price = Number(args[1]);

            if(price.toString != "NaN" && price > 0) {
                if(odd[carNumber] != null) {
                    let userId = m.author.id;
                    if(getBalance(userId) < price) return m.reply("You don't have enough money for this.");
                    if(bets[userId] != null) return m.reply("You have already bet.");
                    if(betState["closed"]) return m.reply('Bets are not opened.');
                    m.reply("Your bet has been placed on the car N°" + carNumber);
                    m.reply("The odd for this driver is " + odd[carNumber] + " so your gain will be (*rounded up to the next integer*) "+ price + "*" + odd[carNumber] + " : " + Math.ceil(price*odd[carNumber]) + " <:f1coin:834897400610029568>");
                    let bet = [carNumber, price];
                    bets[userId] = bet;
                    setBalance(userId, getBalance(userId) - price);
                    saveBets()
                    return;
                }
                return m.reply("Usage : $bet <carnumber> <price>");
            }
            return m.reply("You must provide a price to bet (and it has to be more than 0)");
        }
    },
    getHelp(m) {
        let embed = new MessageEmbed()
            .setTitle("Bet Command")
            .addField("Description: ", "This command allows you place your bet on the driver you think will win the next race.\nYour gain will be calculated based on the following formula : what you pay * the odd of the driver. Since we want to make sure you never have some bizarre balance, we are rounding up this gain (to the next integer because we are nice people).\nFor instance, if you bet 1 <:f1coin:834897400610029568> on Lewis HAMILTON, who's odd is at " + odd["44"] + " your gain would be " + 1*odd["44"] + " <:f1coin:834897400610029568> but will instead be " + Math.ceil(1*odd["44"]) + " <:f1coin:834897400610029568>.", false)
            .addField("Usage: ", "$bet <carNumber> <price>")
            .setFooter("Anybody can use this command.")
            .setColor("GREEN");
        m.reply(embed);
    }
}

global.saveBets = function() {
    fs.writeFileSync('./data/bets.json', JSON.stringify(bets));
}