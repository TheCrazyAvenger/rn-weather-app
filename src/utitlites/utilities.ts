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
    const date = new Date(item['dt_txt']);
    const data = option === 'time' ? date.getHours() : date.getDate();

    if (data === value) newList.push(item);
  });

  return newList;
};
