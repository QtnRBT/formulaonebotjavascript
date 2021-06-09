const fs = require("fs");
const challengesFile = fs.readFileSync("./challenges/challenges.json");

module.exports = {
    name: "confirmchallenge",
    admin: true,
    aliases: ["cc"],
    description: "This command allows you to confirm that somebody achieved a certain challenge.",
    usage: "$confirmchallenge @someone <name of the challenge>",
    execute(m, args) {
        let json = JSON.parse(challengesFile);
        if(args.length >= 2) {
            let person = m.mentions.members.first();
            let challenge = args[1];
            if(json[challenge] != null && person != null) {
                let challengesCompleted = getChallengesCompleted(person.user.id);
                if(challengesCompleted.includes(challenge)) return m.reply(person.toString() + " has already completed this challenge.");
                challengesCompleted.push(challenge);
                setChallengesCompleted(person.user.id, challengesCompleted);
                m.reply(person.toString() + " successfully completed the challenge **" + challenge + "** and won " + json[challenge].reward + " <:f1coin:834897400610029568> !");
                setBalance(person.user.id, getBalance(person.user.id) + json[challenge].reward);
                return;
            }
            m.reply(this.usage + "no");
            return;
        } else {
            m.reply(this.usage);
            return;
        }
    }
}