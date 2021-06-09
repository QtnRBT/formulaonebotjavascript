const fs = require("fs");
const challengesFile = fs.readFileSync("./challenges/challenges.json");

module.exports = {
    name: "challenge",
    description: "A command that allows you to complete a challenge",
    admin: false,
    aliases: ["c"],
    usage: "$challenge <name of the challenge to complete>",
    execute(m, args) {
        const json = JSON.parse(challengesFile);
        if(args.length == 0) return m.reply(this.usage);
        try {
            let mod = require(json[args[0]].code);
            mod.do(m, args);
        } catch(e) {
            if(json[args[0]] != null) {
                if(e.name == "TypeError") {
                    m.reply("This challenge has no automation. Please contact the admins directly.");
                    return;
                }
                console.log(e);
            }
            if(e.name == "TypeError") {
                m.reply("This challenge doesn't exist.");
                return;
            }
            m.reply("There was an error. Please contact the admins");
            console.log(e);
        }
    }
}