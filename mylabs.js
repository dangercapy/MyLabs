
console.log("MyLabs V1.0.0")

// Bot stuff
const telegrambot = require('node-telegram-bot-api');
const token = require("./mylabs.json").telegramBotToken;
console.log(token)
const bot = new telegrambot(token, { polling: true });
var exec = require('child_process').exec;
let servers = require("./mylabs.json").servers;

const chatId = require("./mylabs.json").telegramChatID;
bot.sendMessage(chatId, "MyLabs is now running, made by dangercapy.")



let timeOut = setInterval(() => {
    myLabsMain()
}, 20000);

let statusDictionary = {}
for (let server of servers) {
    statusDictionary[server] = true
}
console.log(statusDictionary)

function myLabsMain() {
    for (let server of servers) {
        exec("ping -c 3 " + server, function (err, stdout, stderr) {
            const chatId = require("./mylabs.json").telegramChatID;
            console.log("Pinging " + server)

            if (stdout.includes("64 bytes from")) {
                if (statusDictionary[server] == false) {
                    bot.sendMessage(chatId, server + " connection has been recovered!")
                }

                console.log("Ping Succesfull on " + server)
                statusDictionary[server] = true
            }

            else {
                if (statusDictionary[server] == true) {
                    console.error("!!! Ping failed on " + server + " !!!")
                    bot.sendMessage(chatId, "Ping has failed failed on " + server + "!")
                    statusDictionary[server] = false
                }

                else { 
                    console.log("No message sent, " + server + " was already reported down.")
                }
            }
        })
    }
}