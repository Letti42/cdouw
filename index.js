/*// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;

var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});*/


import { exec } from 'child_process';
import queryString from "query-string";
import { config } from 'dotenv'; config();
import { getAuthToken } from './tokengen.js';

var command = 'curl -H "Origin: https://studio.code.org/" https://studio.code.org/api/v1/projects/gallery/public/all/100'
/*
child = exec(command, function(error, stdout, stderr){

console.log('stdout: ' + stdout);
console.log('stderr: ' + stderr);

if(error !== null)
{
    console.log('exec error: ' + error);
}

});
*/
function loginReq(token) {
    let cred = { "user[hashed_email]": process.env.EMAIL, "user[login]": "", "user[password]": process.env.PASSWORD, "authenticity_token": token };
    let form = queryString.stringify(cred);

    let cmd = `curl -v -X POST https://studio.code.org/users/sign_in -H "Origin: https://studio.code.org/users/sign_in" -H "Content-Type: application/x-www-form-urlencoded" -d "${form}"`

    exec(cmd, function (error, stdout, stderr) {

        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);

        if (error !== null) {
            console.log('exec error: ' + error);
        }

    });
}

//

;(async()=>{
    let token = await getAuthToken();
    console.log(token);
    //loginReq(token);
})();