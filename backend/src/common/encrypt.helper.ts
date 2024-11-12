import * as bcrypt from 'bcrypt';
// import CryptoJS from 'crypto-js';

export const encryptPassword = async (password: string): Promise<string> => {
  const salt: string = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

export const verifyPassword = async (
  password: string,
  encryptedPassword: string,
) => {
  return await bcrypt.compare(password, encryptedPassword);
};

// export const signWithHMACSHA256 = (secretKey: string, data: string) => {
//   const signature = CryptoJS.HmacSHA256(data, secretKey);
//   const signatureHex = CryptoJS.enc.Hex.stringify(signature);
//   return signatureHex.toUpperCase();
// };
