let version = "V1.0.0"
console.log(version)



const telegrambot = require('node-telegram-bot-api');
const token = require("./mylabs.json").telegramBotToken;
const bot = new telegrambot(token, { polling: true });



var exec = require('child_process').exec;

let servers = require("./mylabs.json").servers;



const chatId = require("./mylabs.json").telegramChatID;
bot.sendMessage(chatId, "MyLabs " + version + " is now running.")



let timeOut = setInterval(() => {
    myLabsMain()
}, 20000);



let statusDictionary = {}
for (let server of servers) {
    statusDictionary[server] = true
}



function myLabsMain() {
    for (let server of servers) {
        exec("ping -c 3 " + server, function (err, stdout, stderr) {
            const chatId = require("./mylabs.json").telegramChatID;
            console.log("Pinging " + server)

            if (stdout.includes("64 bytes from")) {
                if (statusDictionary[server] == false) {
                    bot.sendMessage(chatId, "MyLabs " + version + ": " + server + " connection has been recovered!")
                }

                console.log("Ping Succesfull on " + server)
                statusDictionary[server] = true
                console.log("Status has been verified and/or changed.")
                console.log(statusDictionary)
            }

            else {

                if (statusDictionary[server] == true) {
                    console.error("!!! Ping failed on " + server + " !!!")
                    bot.sendMessage(chatId, "MyLabs " + version + ": Ping has failed failed on " + server + "!")
                    statusDictionary[server] = false
                    console.log("Status has been verified and/or changed.")
                    console.log(statusDictionary)
                }

                else { 
                    console.log("No message sent, " + server + " has already been reported down earlier.")
                }
            }
        })
    }
}