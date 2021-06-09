const fs = require("fs");
const challengesFile = fs.readFileSync("./challenges/challenges.json");

const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "challenges",
    description: "A command that allows you to see the challenges",
    admin: false,
    aliases: ["cs"],
    usage: "$challenges",
    execute(m, args) {
        const json = JSON.parse(challengesFile);

        let embed = new MessageEmbed()
            .setTitle("Challenges");


        for (let key in json) {
            embed.addField(json[key].name, "" + json[key].usage + " : " + json[key].description);
        }

        embed.setColor("GREEN");
        m.reply(embed);
    }
}