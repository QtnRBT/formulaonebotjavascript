let request = require('request');
const {MessageEmbed} = require("discord.js");

const newOptions = {
    method: 'GET',
    url: 'https://api.openweathermap.org/data/2.5/forecast?lat=41.56&lon=2.25&appid=5e673276e3d58d7c9d95bcc00608b772',
    headers: {
    }
};

module.exports = {
    name: "weather",
    usage: "$weather",
    description: "A simple command that checks the weather.",
    admin: false,
    execute(m, args) {
        if(args.length >= 2) {
            if(Number(args[0]).toString() == "NaN" && Number(args[1]).toString() == "NaN") return m.reply("Please input correct coordinates.");
            newOptions.url = "https://api.openweathermap.org/data/2.5/forecast?lat="+args[0]+"&lon="+args[1]+"&appid=5e673276e3d58d7c9d95bcc00608b772";
        }
        request(newOptions.url, newOptions, (error, response, body) => {
            for(let day of JSON.parse(body).list) {
                console.log(day);
            }
        });
    },
    getHelp(m) {
        let embed = new MessageEmbed()
            .setTitle("Weather Command")
            .addField("Description: ", "This command allows you to see the weather at a specific place.", false)
            .addField("Usage: ", "$weather <lat> <lon>")
            .setFooter("Anybody can use this command.")
            .setColor("GREEN");
        m.reply(embed);
    }
}