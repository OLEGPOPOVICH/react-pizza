import { DBPizzaData } from './fakeData';

export const dataServices = {
  getPizzaData({ timeout }) {
    return dataServices.execute({
      timeout,
      fakeData: DBPizzaData,
    });
  },
  execute(options) {
    const { timeout, fakeData } = options;

    if (!timeout) {
      return fakeData;
    }
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeData), timeout);
    });
  },
};
