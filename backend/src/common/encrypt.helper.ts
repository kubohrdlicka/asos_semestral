import * as argon2 from 'argon2';
// import CryptoJS from 'crypto-js';

export const encryptPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password);
};

export const verifyPassword = async (
  password: string,
  encryptedPassword: string,
) => {
  return await argon2.verify(encryptedPassword, password);
};

// export const signWithHMACSHA256 = (secretKey: string, data: string) => {
//   const signature = CryptoJS.HmacSHA256(data, secretKey);
//   const signatureHex = CryptoJS.enc.Hex.stringify(signature);
//   return signatureHex.toUpperCase();
// };
