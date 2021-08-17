const Discord = require('discord.js');
const config = require('./config.json');
const insults = require('./insults.json');
const help = require("./help.json");

const client = new Discord.Client();
const botHelp = new Discord.MessageEmbed()
.setTitle(help.title)
for(var i = 0; i< help.fields.length; i++){
    botHelp.addField(help.fields[i], help.fields_value[i]);
}

client.login(config.token);

client.once('ready', ()=>{
console.log("ready");
});

// client.on('message', async message =>{
//     if(message.member.voice.channel){
//         // const connection = await message.member.voice.channel.join();
//         // const dispatcher = connection.play('song.mp3');
//         // dispatcher.on('error', console.error);
//     }
// })



client.on('voiceStateUpdate', (oldState, newState) =>{
    try{
        if(newState.channel.id == '804719110482558997'){
        const channel = client.channels.cache.get('759392646434652171')
        const user = newState.member.user.id;
        if(user != "775051214672887840"){
            channel.send("<@" + newState.member.user.id + "> has been a bad boy!");
        }
        const connection = newState.channel.join().then(connection =>{
            const dispatcher = connection.play('song.mp3');
            dispatcher.on('error', console.error);
        });
    }
    }catch(error){
        console.log(error)
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        console.log(time)
    }
})

client.on('message', (msg) =>{
    if(!msg.content.toLowerCase().startsWith(config.prefix.toLowerCase()) || msg.author.bot) return;

    const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    try{
    if(command === 'insult'){
        reply(msg, insults);
    }else if(command === 'apologize'){
        reply(msg, help.sorry);
    }else if(command === 'spank'){
        reply(msg,help.spank_response);
    }else if(command === 'help'){
        msg.channel.send(botHelp);
    }else if(command === 'hitonme'){
        reply(msg, help.hit_response);
    }

    } catch(error){
        msg.channel.send("I'm so stupid! there was an error executing the command");
        console.log(error);
    }
});

function reply(msg, s){
    msg.reply(s[parseInt(Math.random() * s.length)]);
}