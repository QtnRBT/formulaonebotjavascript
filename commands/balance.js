module.exports = {
    name: "balance",
    description: "A command to see your money",
    execute(m, args) {
        if(args.length == 0) {
            return m.reply("You've got " + profile[m.author.id].balance + " <:f1coin:834897400610029568> in your balance.");
        }
        if(m.mentions.members.first() != null) {
            let user = m.mentions.members.first().user;
            if(user != null) {
                if(profile[user.id] != null) {
                    return m.reply(user.toString() + " has got " + profile[user.id].balance + " <:f1coin:834897400610029568> in his balance.");
                }
                return m.reply("This user has no balance.");
            }
            return m.reply("Please mention a valid user.");
        }
        return m.reply("Please mention a valid user.");
    }
}