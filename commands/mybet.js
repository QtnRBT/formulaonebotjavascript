module.exports = {
    name: "mybet",
    description: "Allows you to see your bets",
    execute(m, args) {
        let userId = m.author.id;
        if(bets[userId] != null) {
            let bet = bets[userId];
            m.reply("You have bet " + bet[1] + " <:f1coin:834897400610029568> on the car N°" + bet[0] + ".");
            return;
        }
        return m.reply("You have not bet yet.");
    }
}