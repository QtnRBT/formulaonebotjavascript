const request = require("request");

module.exports = {
    name: "fetch",
    description: "This command allows you to fetch the Formula One api to get the latest result.",
    execute(message, args) {

        let raceName = "";
        let circuitName = "";
        let finalData = "";

        request("http://ergast.com/api/f1/current/last/results.json", {json: true}, (err, res, body) => {
           if(err) throw err;

           message.reply(body.MRData.RaceTable.Races[0].Circuit.circuitName);
           let resultsArray = body.MRData.RaceTable.Races[0].Results;
           console.log(resultsArray);
            for (const result of resultsArray) {
                //console.log()
                console.log(result.Driver.givenName + " " + result.Driver.familyName.toUpperCase() + " car N°" + result.number + " finished in P" + result.position);
            }
        });
        //message.reply(raceName);
        message.reply("Check console.");
    }
}