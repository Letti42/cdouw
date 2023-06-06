import fetch from 'cross-fetch';

//Get authenticity token for login
export async function getAuthToken(){
    let response = await fetch('https://studio.code.org/users/sign_in');
    let text = await response.text();
    let token = text.split('authenticity_token')[1].split('content="')[1].split('"')[0];
    return token;
}
