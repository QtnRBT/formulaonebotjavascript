let request = require('request');

const newOptions = {
    method: 'GET',
    url: 'https://api.openweathermap.org/data/2.5/forecast?lat=41.56&lon=2.25&appid=5e673276e3d58d7c9d95bcc00608b772',
    headers: {
    }
};

module.exports = {
    name: "weather",
    description: "A simple command that checks the weather.",
    execute(m, args) {
        request(newOptions.url, newOptions, (error, response, body) => {
            for(let day of JSON.parse(body).list) {
                console.log(day);
            }
        });
    }
}