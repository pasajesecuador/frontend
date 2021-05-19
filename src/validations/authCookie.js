import crypto from 'crypto';
import axios from 'axios';
import { TICKETSITT, IV } from '../actions/types';

function encryptCookies(cookies) {
  const token = cookies.substr(7);

  const cookieHex = crypto.createCipheriv('aes-256-cfb8', TICKETSITT, IV);
  const encrypted = cookieHex.update(token).toString('hex');
  
  return encrypted;
}

async function encrypAuth(props) {
  var d = new Date();
  d.setTime(d.getTime() + (3600*1000));

  const data = {
    id: props.user.id
  }
  const isIt = await axios.post('/api/auth/token/is/verified', data)
    .then(res => {
      if(res.data.status === 'ok'){
        return true
      } else {
        return false
      }
    })

  if(isIt) {
    const auth = props.isAuthenticated ? 'True' : 'False';
    const secretKey = crypto.createCipheriv('aes-256-cfb8', TICKETSITT, IV).update(auth).toString('hex');
    document.cookie = `_uuv=${secretKey};expires=${d.toUTCString()};path=/`;
  }
}

export const cookieSetLogin = (props) => {
  const encryptedCookie = encryptCookies(props.token);
  var d = new Date();
  d.setTime(d.getTime() + (3600*1000));
  document.cookie = `_usid=${encryptedCookie};expires=${d.toUTCString()};path=/`;
  encrypAuth(props);
  return true;
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function decipherSha(cipher){
  let encryptedBuffer = Buffer.from(cipher.toString('hex'), 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cfb8', TICKETSITT, IV);
  let decrypted = decipher.update(encryptedBuffer);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString()
}

export const cookieGetToken = (cookie) => {
  const getting = getCookie(cookie);
  if(getting !== null) {
    const hex = decipherSha(getting);
    return hex;
  }
}

export const cookieAuth = (cookie) => {
  const name = getCookie(cookie);
  if(name !== null) {
    const hex = decipherSha(name);
    return hex;
  }
}