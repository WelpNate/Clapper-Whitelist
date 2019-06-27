// this code was given to me by 1988_YumChocolate from the ROBLOX API Server, all credits (as far as I know) go to him



const roblox = require('roblox-js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NTg4NTEyODEwODU4OTcxMTM4.XQGNbQ.mNpmXhcFhnNc2-3x8U5fUpwwwfE";

client.login(token)

var prefix = '!';


function login() {
    const rbx = require('roblox-js');
const fs = require('fs');

const cookieFile = './cookie';
const cookie = JSON.parse('{"cookie": "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_D6ED462D573876DDEBA10E2CD4077053FDB81FD5703320B715E9614666A7E35FBC85B5D60F73030A85A8D5F589EA38BF5C36212F266B7836A63AE240BB56554D4C53792CD86E8FE29F95AFF8DDBE11AFC4C76F6B34F64D7DBF6D4906EF1F161EA15D205C2A9F83177B60F8E2004F048831372D50BCCB98E291368DC481742ECF22907C1491DE00964BA5999087D24F92F8E46B401F29AAEC4CB4E7E8F5364629DFF9D6AF3E35168111CC951174546856021204923CA27B5565EC543BCA817B506D7AB9909CCD91A9C8C7B23C10AA59E92CAA332B66C3F55DCFB3AA5F4F3A0052730FD3D809BF03AB78351C80359BD9EC5CD9EEA6929EC4A617115A41A1ABC38C81BA636477E0417E8A92CA6E9DD3A2003C0425F9022533170C8EDECE4F97E16B39BAFD47"}').cookie;
rbx.options.jar.session = cookie;
const relog = () => {
  return rbx.getVerification({url: 'https://www.roblox.com/my/account#!/security'})
    .then((ver) => {
      return rbx.getGeneralToken().then((token) => {
        return rbx.http({
          url: 'https://www.roblox.com/authentication/signoutfromallsessionsandreauthenticate',
          options: {
            method: 'POST',
            resolveWithFullResponse: true,
            verification: ver.header,
            jar: null,
            headers: {
              'X-CSRF-TOKEN': token
            },
            form: {
              __RequestVerificationToken: ver.inputs.__RequestVerificationToken
            }
          }
        }).then((res) => {
          console.log(res.statusCode);
          console.log(res.body);
          var cookies = res.headers['set-cookie'];
          if (cookies) {
            rbx.options.jar.session = cookies.toString().match(/\.ROBLOSECURITY=(.*?);/)[1];
            fs.writeFile(cookieFile, JSON.stringify({cookie: rbx.options.jar.session}), (err) => {
              if (err) {
                console.error('Failed to write cookie');
              }
            });
          }
        });
      });
    });
};

(async () => {
  console.log('...' + rbx.options.jar.session.substr(-20));
  console.log(await rbx.getCurrentUser());
  await relog();
  console.log('...' + rbx.options.jar.session.substr(-20));
  console.log(await rbx.getCurrentUser());
})();
    return relog();
}
//setInterval(function() {
login()
    .then(function() {
        console.log('Logged in.') 
    })
    .catch(function(error) { 
        console.log(`Login error: ${error}`) 
    });
//  }, 10000);
 
function isCommand(command, message){
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
}



 
client.on('message', (message) => {
  client.user.setActivity('friend requests', { type: "WATCHING" })
    if (message.author.bot) return; 
    var args = message.content.split(/[ ]+/)
    var why = new Discord.RichEmbed()
    .addField("Friend Requests", "Accepting Friend Request")
    .setFooter("Whitelist Bot#8328", client.user.avatarURL)
    .setColor(0x0000FF)
    
    var help = new Discord.RichEmbed()
    .addField("Help", "!accept -- accepts friend request")
    .setFooter("Whitelist Bot#8328", client.user.avatarURL)
    .setColor(0x0000FF)


   
    if(isCommand('accept', message)){
        if(!args[1]) return message.channel.send("Please put a userID and sent a friend request.")
        //if(roblox.getUsernameFromId(args[1])) return message.channel.send("Please Send valid id") 
        if (!message.member.roles.some(role => role.name === 'Whitelisted')) return message.channel.send("Get whistlisted first.");
        roblox.acceptFriendRequest(args[1]);
message.channel.sendEmbed(why);
   }

   if(isCommand('help', message)){
    message.channel.sendEmbed(help);
   }
  
})
