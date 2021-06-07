const fs = require("fs");
const invitesFile = fs.readFileSync("./challenges/invites.json");

module.exports = {
    do(m, args) {
        let json = JSON.parse(invitesFile);
        m.guild.fetchInvites()
            .then(invites => {
                for (let i of invites) {
                    if (i[0] in json) {
                        let invite = i[1];
                        if(invite.uses >= 10) {
                            m.reply("Congratulations ! You just won 500 <:f1coin:834897400610029568> !");
                            setBalance(m.author.id, getBalance(m.author.id) + 500);
                            delete json[invite.code];
                            fs.writeFileSync("./challenges/invites.json", JSON.stringify(json));
                            invite.delete();
                            return;
                        }
                        m.reply("Your invite https://discord.gg/" + invite.code + " currently has " + invite.uses + "/10 uses.");
                        return;
                    }
                }
                m.channel.createInvite({maxUses: 0, maxAge: 0}).then(invite => {
                    json[invite.code] = {author: m.author.id};
                    fs.writeFileSync("./challenges/invites.json", JSON.stringify(json));
                    m.reply("Your invite has been created ! You now need to send this link to all your friends. " + invite.toString());
                });
        })
    }
}