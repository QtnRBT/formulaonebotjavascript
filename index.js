const Discord = require("discord.js");
const fs = require('fs');

const {prefix, token} = require('./config.json');

const shopFile = fs.readFileSync("./data/shop.json");
global.shop = JSON.parse(shopFile);

const data = fs.readFileSync('./data/profiles.json');
global.profile = JSON.parse(data);

const oddsFile = fs.readFileSync('./data/odds.json');
global.odd = JSON.parse(oddsFile);

const betFile = fs.readFileSync('./data/bets.json');
global.bets = JSON.parse(betFile);

const betsClosedFile = fs.readFileSync('./data/betsClosed.json');
global.betState = JSON.parse(betsClosedFile);

const client = new Discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
    console.log(command.name)
}

// commands stuff
client.on('message', msg => {
    if(msg.content.startsWith(prefix)) {
        let contentArray = msg.content.split(" ");
        let command = contentArray[0].replace(prefix, "");
        let args = contentArray.slice(1, contentArray.length);

        if(!client.commands.has(command)) return;

        try {client.commands.get(command).execute(msg, args);} catch(e) {console.log(e)}
    } else {
        if(msg.author.bot) return;
        for (const emoji of shop.emojis) {
            let value = Object.values(emoji)[1];
            if(msg.content.includes(value.toString())) {
                if(!profile[msg.member.id].inventory.includes(value)) {
                    msg.delete();
                    msg.reply("You don't have the permission to use this emoji : buy it first.");
                }
            }
        }
    }
});

client.on('messageReactionAdd', (reaction, user) => {
    if(user.bot) return;
    let msg = reaction.message;
    let userId = user.id;
    let reactionString = "<:" + reaction.emoji.name + ":" + reaction.emoji.id + ">";
    for (const emoji of shop.emojis) {
        let value = Object.values(emoji)[1];
        if(reactionString == value.toString()) {
            if(!profile[userId].inventory.includes(value)) {
                reaction.remove();
                reaction.message.channel.send("You don't have the permission to use this emoji : buy it first.");
            }
        }
    }
});

client.on('ready', () => {
    let guild = client.guilds.cache.first();
    for(let member of guild.members.cache) {
        let user = member[1].user;
        if(!user.bot) {
            let id = user.id;
            if(profile[id] == undefined) {
                let json = '{"'+ id + '": { "balance": 100, "inventory": [] }}';
                profile[id] = JSON.parse(json)[id];
                writeData();
            }
        }
    }
    fs.writeFileSync("./data/profiles.json", JSON.stringify(profile));
    console.log(`Connected as ${client.user.username}`);
});

client.on('guildMemberAdd', member => {
   let user = member.user;
   if(!user.bot) {
       let id = user.id;
       if(profile[id] == undefined) {
           let json = '{"'+ id + '": { "balance": 100, "inventory": [] }}';
           profile[id] = JSON.parse(json)[id];
           writeData();
       }
   }
});

client.on('guildMemberRemove', member => {
   let user = member.user;
   if(!user.bot) {
       let id = user.id;
       if(profile[id] != undefined) {
           delete profile[id];
           writeData();
       }
   }
});

client.on('disconnect', () => {
    console.log("Au revoir");
    writeData();
});

global.getBalance = function(userId) {
    return profile[userId].balance;
}

global.setBalance = function(userId, balance) {
    profile[userId].balance = balance;
    writeData();
    return;
}

global.writeData = function() {
    fs.writeFileSync("./data/profiles.json", JSON.stringify(profile));
    return;
}

global.retrieveData = function() {
    global.profile = JSON.parse(fs.readFileSync("./data/profiles.json"));
}

global.saveBetsSate = function() {
    fs.writeFileSync("./data/betsClosed.json", JSON.stringify(betState));
}

client.login(token);