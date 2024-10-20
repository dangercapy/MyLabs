This is a very niche and un-likeable program to use in your environment.

Simple explanation:
    In the ./mylabs.json file, you change the variables, to your own stuff. like so:
```json
{
    "telegramBotToken": "Very-Long telegram api thing",
    "telegramChatID": "kinda shot chat id telegram thing",
    "servers": [
    "192.168.0.1",
    "192.168.0.254",
    "192.168.0.253"
    ]
}
```
In this case, the program will check if the following ip's:
192.168.0.1
192.168.0.254
192.168.0.253
are online, and sent a message when this is no(longer) the case.
You can, after changing these values to your own, also use the docker file to build & run the program. This is the recommended way to use the program.

Made by dangercapy.