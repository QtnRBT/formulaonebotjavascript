module.exports = {
    name: "closebets",
    description: "Allows you to close the bets.",
    execute(m, args) {
        if(!m.member.hasPermission("ADMINISTRATOR")) return m.reply("I don't think you have the facilities for that, big man.");
        if(!betState["closed"]) {
            betState["closed"] = true;
            saveBetsSate();
            return m.guild.channels.cache.find(channel => channel.id === "833637998813511720").send(m.author.toString() + " closed the bets.");
        }
        return m.reply("Bets are already closed.");
    }
}