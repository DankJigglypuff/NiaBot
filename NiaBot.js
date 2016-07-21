//Check if plugins exist

var DiscordClient = require('discord.io');
var Lame = require('lame');
var fs = require('fs');
var spawn = require('child_process').spawn;

//Creating Bot
var bot = new DiscordClient({
    autorun: true,
    token: "MjA0ODc3MDUyOTc1Nzc1NzQ1.Cm92Hw.6LtX-91J-Q8nCTTf3ahYzZ-ZeDc"	
});

//IDs
var Caleb = "146682181668962306";
var Savva = "107268889678708736";
var Alec = "89497694254432256";
var Nia = "203113479966556160";
var Yuno = "203341967978004481";
var Gabriel = "160915383660838912"
var Jack = "160901406453137408"
var Tyson = "163836228595089408"
var Ian = "160926781329768448"
var Shitposting = "160866222194425856"
var Scheduling = "162620746022125569"
var Meta = "183410005817556992"
var Animu = "203056139317936129"
var Coding = "167080257831174144"
var Admin = "160867765815607296"
var serverID = "160866222194425856";

//Random Variables
var newTime = "";
var posted = false;
var sing = false;
var file = "";

//Bot Disconnection
bot.on("disconnect", function() {
	console.log("Bot disconnected");
	bot.connect() //Auto reconnect
});

//Processes that start when the bot starts
bot.on('ready', function() {
    console.log(bot.username + " - (" + bot.id + ")");
	var interval = setInterval (function (){
		var time = new Date();
		if (time.getMinutes() < 10){
			currentTime = time.getHours() + ":0" + time.getMinutes();			
		} else {
			currentTime = time.getHours() + ":" + time.getMinutes();
		}
		newTime = currentTime
		
		//Posts the time on the hour in the Coding chat
		if (time.getMinutes() === 0 && posted === false){
			
			bot.sendMessage({
				to: Coding,
				message: "The time is " + newTime
			});
			posted = true;
		}
		
		//Spam protection
		if (time.getMinutes() === 1){
			posted = false;
		}
		
		
	}, 1000);
	
});

//Detecting Messages
bot.on('message', function(user, userID, channelID, message, rawEvent) {
	message = message.toLowerCase(); 
	
	if (message === "channelid") {
		bot.sendMessage({
			to: channelID,
			message: channelID + " is the channel ID"
		});
	}

	if 	   (messageHas("nia", message) 
		&& (messageHas("hi", message)
		||  messageHas("hey", message)
		||  messageHas("hello", message))){
			if (userID === Caleb) {
				bot.sendMessage({
					to: channelID,
					message: "Hello Caleb :heart:"
				});
			} else {
				bot.sendMessage({
					to: channelID,
					message: "Hello"
				});
			}
	}
			

    if (messageHas("current time", message)) {
      bot.sendMessage({
        to: channelID,
        message: "The time is " + newTime
      });
    }
	
	if (messageHas("nia", message) && messageHas("sing", message) && sing == false) {		
		bot.joinVoiceChannel(bot.servers[serverID].members[userID].voice_channel_id);
		bot.sendMessage({
			to: channelID,
			message:"What would you like me to sing?"
		});
		sing = true;
	}
		
	if (messageHas("dango", message) && sing == true){
		file = "dango.mp3";
		bot.getAudioContext({channel: bot.servers[serverID].members[userID].voice_channel_id, stereo: true}, handleStream);
		sing = false;
		console.log("Now Playing 'Dango Daikazoku'")
	}	
	
	if (messageHas("test", message)){
		console.log("woo");
	}
});

function handleStream(stream) {
	var ffmpeg = spawn('ffmpeg' , [ //Or 'avconv', if you have it instead
		'-i', file,
		'-f', 's16le',
		'-ar', '48000',
		'-ac', '2', //If you want one audio channel (mono), you can omit `stereo: true` in `getAudioContext`
		'pipe:1'
	], {stdio: ['pipe', 'pipe', 'ignore']});
			
	ffmpeg.stdout.once('readable', function() {
		stream.send(ffmpeg.stdout);
	});
			
	ffmpeg.stdout.once('end', function() {
		bot.disconnect();
		bot.connect();
	});
}

function playMP3(outputStream, inputFile) {
	var lame = new Lame.Decoder();
	var input = fs.createReadStream(inputFile);
	
	lame.once('readable', function() {
		outputStream.send(lame);
	});
	
	input.pipe(lame);
}

function messageHas(input, message) {
	if (
		   (message.indexOf(" " + input + " ") > -1)
		|| (message.indexOf(" " + input + ",") > -1)
		|| (message.indexOf(" " + input + ".") > -1)
		|| (inputAtFront(input, message))
		|| (inputAtBack(input, message))
		|| (inputIsMessage(input, message))
	){
		return true;
	 } else {
		 return false;
	 }
}

function inputAtFront(input, message){
	var messageLength = message.length;
	var inputLength = input.length;
	var isTrue = 0;
	
	for (i = 0; i < inputLength; i++) {
		if (message[i] == input[i] && (message[inputLength] == " " || message[inputLength] == "," || message[inputLength] == "." || message[input.length] == "")){
			isTrue++;
		} else {
			return false;
		}
	}
	if (isTrue < inputLength){
		return false;
	} else if (isTrue == inputLength){
		return true;
	}
}

function inputAtBack(input, message){
	var messageLength = message.length;
	var inputLength = input.length;
	var isTrue = 0;
	
	for (i = 0; i < inputLength; i++) {
		if (message[(messageLength - inputLength) -1] == " " && message[(messageLength - inputLength) + i] == input[i]){
			isTrue++;
		} else {
			return false;
		}
	}
	if (isTrue < inputLength){
		return false;
	} else if (isTrue == inputLength){
		return true;
	}
}

function inputIsMessage(input, message) {
	if (input === message) {
		return true;
	} else {
		return false;
	}
}