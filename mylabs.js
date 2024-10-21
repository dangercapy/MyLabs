let version = "V1.0.1"
console.log(version)
const http = require("http");
const telegrambot = require('node-telegram-bot-api');
const token = require("./mylabs.json").telegramBotToken;
const bot = new telegrambot(token, { polling: true });
const host = 'localhost';
const port = 8000;

var exec = require('child_process').exec;
let servers = require("./mylabs.json").servers;
const chatId = require("./mylabs.json").telegramChatID;
bot.sendMessage(chatId, "MyLabs " + version + " is now running.")

let timeOut = setInterval(() => {
        myLabsMain()
}, 20000);

const requestListener = function (req, res) {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': 'http://' + require('./myLabs.json').frontEndHost + ':' + require('./mylabs.json').apiPort,
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(statusDictionary));
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

let statusDictionary = {}
for (let server of servers) {
    statusDictionary[server] = true
}

function myLabsMain() {
    for (let server of servers) {
        exec("ping -c 3 " + server, function (err, stdout, stderr) {
            const chatId = require("./mylabs.json").telegramChatID;



            if (stdout.includes("64 bytes from")) {
                if (statusDictionary[server] == false) {
                    bot.sendMessage(chatId, "MyLabs " + version + ": " + server + " connection has been recovered!")
                }

                console.log("up " + server)
                statusDictionary[server] = true
            }



            else {



                if (statusDictionary[server] == true) {
                    console.error("down " + server)
                    bot.sendMessage(chatId, "MyLabs " + version + ": Ping has failed failed on " + server + "!")
                    statusDictionary[server] = false
                }



                else { 
                    console.log(server + " already false.")

                }
            }
        })
    }
}