README MyLabs V1.0.1

This is a very niche and unusual program to use in your environment.

For a simple guide on how to setup a telegram bot, i recommend following:
https://core.telegram.org/bots/tutorial

Simple explanation:
    In the ./mylabs.js file, you change the variables, to your own stuff. like so:
```json
{
    "telegramBotToken": "Very-Long telegram api thing", // Insert your Telegram Bot Token over here.
    "telegramChatID": "kinda short chat id telegram thing", // Insert your Telegram Chat Api of the chat/groupchat with your bot.
    "servers": [ 
    "192.168.0.1",
    "192.168.0.254",
    "192.168.0.253",
    "cloudflare.com"
    ] // Dont forget to add the commas. You can also check domain names.
}
```
In this case, the program will check if the hosts from the following list are online, and react in case they aren't by sending a message to your telegram using the provided data.

* hosts
    * 192.168.0.1
    * 192.168.0.254
    * 192.168.0.253
    * cloudflare.com

You can, after changing these values to your own, also use the docker file to build & run the program. This is the recommended way to use the program.

Using the MyLabs API with (coming soon) MyLabs Gui:
If you want to use the MyLabs API you will have to set the frontEndHost and apiPort in the mylabs.json file.
frontEndHost is the host on which your web-server with the gui will run.
apiPort is the port you will use to connect to the api hosted on the backend. (this app.)

Using MyLabs with Docker:
MyLabs was made to be used with Docker, you can do this the following way:

First we need to build the image using the provided Dockerfile, we can achieve this using the following command:
```bash
docker build -t mylabs -f Dockerfile .
```
After running this command we can now start the image using the next command:
```bash
docker run mylabs
```
Made by dangercapy.