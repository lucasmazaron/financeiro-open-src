import * as bcrypt from 'bcrypt';

export const hashPassword = async (pass: string): Promise<string> => {
  return await bcrypt.hash(pass, 9);
};

export const comparePassword = async (pass, hash: string): Promise<boolean> => {
  return await bcrypt.compare(pass, hash);
};

export const hexEncode = (str: string) => {
  let hex: string, i: number;

  let result = '';
  for (i = 0; i < str.length; i++) {
    hex = str.charCodeAt(i).toString(16);
    result += ('000' + hex).slice(-4);
  }

  return result;
};
