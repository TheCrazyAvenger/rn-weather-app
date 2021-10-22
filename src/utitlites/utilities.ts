import {MONTH_NAMES, WEEK_DAYS} from './data';

export const updateWeek = () => {
  const currentDay = WEEK_DAYS.slice(0, new Date().getDay() - 1);
  const currentWeek = [
    ...WEEK_DAYS.slice(new Date().getDay() - 1),
    ...currentDay,
  ];

  return currentWeek.map((item, i) => {
    if (i === 0) {
      item.name = 'Today';
    }
    if (i === 1) {
      item.name = 'Tomorrow';
    }
    return item;
  });
};

export const getMonth = () => MONTH_NAMES[new Date().getMonth()];

export const getWeather = (
  list: Array<any>,
  value: number,
  option?: string,
) => {
  const newList: any = [];
  const days = list;

  days.map(item => {
    const date = new Date(item['dt'] * 1000);
    const data = option === 'time' ? date.getHours() : date.getDate();

    if (data === value) newList.push(item);
  });

  return newList;
};

export const lo2t = (lon: number, zoom: number) => {
  return Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
};
export const la2t = (lat: number, zoom: number) => {
  return Math.floor(
    ((1 -
      Math.log(
        Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180),
      ) /
        Math.PI) /
      2) *
      Math.pow(2, zoom),
  );
};
