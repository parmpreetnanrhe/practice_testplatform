export const decryptPassword = (str = '', ky = 'TcYoNlInEWaHeGuRuShRiGuRuGrAnThSaHiBjIsTeEk') => {
    str = String(str);
    str = str.replace(/ /g, '+'); // Replace spaces with '+'
    const decodedStr = atob(str); // Base64 decode

    if (ky === '') {
      return decodedStr;
    }

    ky = ky.replace(/\s/g, ''); // Remove spaces from key
    if (ky.length < 8) {
      throw new Error('key error');
    }

    const kl = ky.length < 32 ? ky.length : 32;
    const k = [];

    // Create the key array
    for (let i = 0; i < kl; i++) {
      k[i] = ky.charCodeAt(i) & 0x1F;
    }

    let j = 0;
    let result = '';

    // Decrypt the string
    for (let i = 0; i < decodedStr.length; i++) {
      const e = decodedStr.charCodeAt(i);
      if (e & 0xE0) {
        result += String.fromCharCode(e ^ k[j]);
      } else {
        result += String.fromCharCode(e);
      }
      j++;
      j = j === kl ? 0 : j;
    }

    return result;
  };

  export const encryptPassword = function encryptPassword(str = '', ky = 'TcYoNlInEWaHeGuRuShRiGuRuGrAnThSaHiBjIsTeEk') {
    str = String(str);
    if (ky === '') {
        return str;
    }

    ky = ky.replace(/ /g, '');
    if (ky.length < 8) {
        throw new Error('Key error');
    }

    const kl = ky.length < 32 ? ky.length : 32;
    const k = [];

    for (let i = 0; i < kl; i++) {
        k[i] = ky.charCodeAt(i) & 0x1F;
    }

    let j = 0;
    let encryptedStr = '';

    for (let i = 0; i < str.length; i++) {
        const e = str.charCodeAt(i);
        encryptedStr += e & 0xE0 ? String.fromCharCode(e ^ k[j]) : String.fromCharCode(e);
        j++;
        j = j === kl ? 0 : j;
    }

    encryptedStr = btoa(encryptedStr); // Base64 encoding
    return encryptedStr;
}
 
