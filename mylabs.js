let version = "V1.0.1"
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