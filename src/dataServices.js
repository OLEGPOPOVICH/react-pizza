import { data } from './data';

export const getData = ({ timeout = 0 }) => {
  if (!timeout) {
    return data;
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(data), timeout);
  });
};
