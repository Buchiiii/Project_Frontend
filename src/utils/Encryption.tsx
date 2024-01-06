import CryptoJS from "crypto-js";

const my_secret = "my-secret";

export const encryptObject = (data: {}) => {
  const dataa = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    my_secret
  ).toString();
  return dataa;
};

export const encryptText = (data: string) => {
  const dataa = CryptoJS.AES.encrypt(data, my_secret).toString();
  return dataa;
};
