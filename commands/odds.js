const fs = require('fs');
const { MessageEmbed } = require('discord.js');

const driversFile = fs.readFileSync("./data/drivers.json");
const drivers = JSON.parse(driversFile);

module.exports = {
    name: "odds",
    usage: "$odds",
    description: "Allows you to see the odds of the drivers",
    admin: false,
    execute(m, args) {
        let s = "";

        for(let [key, value] of Object.entries(drivers)) {
            let driverOdd = odd[key];
            s+= value.split(" ")[0] + " " + value.split(" ")[1].toUpperCase() + " (Car N°**" + key + "**) : *" + driverOdd + "*\n";
        }

        const embed = new MessageEmbed()
            .setTitle("Odds Manager")
            .addField("F1 Driver Odds", s, false)
            .setColor("#FFD700");

        m.channel.send(embed);
    },
    getHelp(m) {
        let embed = new MessageEmbed()
            .setTitle("Odds Command")
            .addField("Description: ", "This command allows you to see the drivers odds.", false)
            .addField("Usage: ", "$odds")
            .setFooter("Anybody can use this command.")
            .setColor("GREEN");
        m.reply(embed);
    }
}