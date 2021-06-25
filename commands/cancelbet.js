module.exports = {
    name: "cancelbet",
    description: "This command allows you to cancel your current bet.",
    admin: false,
    usage: "$cancelbet [<@someone>]",
    execute(m, args) {
        let userId = null;
        if(args.length == 0) {
            userId = m.author.id;
        } else {
            if(!m.member.hasPermission("ADMINISTRATOR")) return m.reply("I don't think you have the facilities for that, big man.");
            if(m.mentions.members.first() == null) {
                return m.reply(this.usage);
            }
            userId = m.mentions.members.first().id;
        }
        if(bets[userId] != null) {
            let previousBet = bets[userId];
            let price = 0;
            if(previousBet.length == 2) {
                price = previousBet[1];
            } else {
                price = previousBet[3];
            }
            let otherBets = {};
            for(let entry of Object.entries(bets)) {
                let key = entry[0];
                let value = entry[1];

                if(key != userId) {
                    otherBets[key] = value;
                }
            }
            if(args.length == 0) {
                m.reply("Your bet has been canceled, you've been credited " + price + " <:f1coin:834897400610029568>.")
            } else {
                m.reply(m.mentions.members.first().toString() + " has been credited " + price + " <:f1coin:834897400610029568>.")
            }
            setBalance(userId, getBalance(userId) + price);
            writeData();
            bets = otherBets;
            saveBets();
            return;
        }
    }
}