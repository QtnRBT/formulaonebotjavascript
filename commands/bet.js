const fs = require('fs');

module.exports = {
    name: "bet",
    description: "Allows you to bet basically",
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
                    m.reply("The odd for this driver is " + odd[carNumber] + " so your gain will be (*rounded up to the next integer*) : " + Math.ceil(price*odd[carNumber]) + " <:f1coin:834897400610029568>");
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
    }
}

global.saveBets = function() {
    fs.writeFileSync('./data/bets.json', JSON.stringify(bets));
}