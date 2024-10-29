import {Linking} from 'react-native';

export const sectionListFormat = (data: any, title: string, body: string) => {
  return data.reduce((r: any, s: any) => {
    r.push({title: s[title], data: s[body]});
    return r;
  }, []);
};

export const daysItem = (day: number) => {
  if (day !== undefined) {
    switch (day) {
      case 0:
        return 'Понедельник';
      case 1:
        return 'Вторник';
      case 2:
        return 'Среда';
      case 3:
        return 'Четверг';
      case 4:
        return 'Пятница';
      case 5:
        return 'Суббота';
      case 6:
        return 'Воскресенье';
    }
  }
  return '';
};

export const alphabeticalSorting = (array: any, key: string) => {
  return array.sort((a: any, b: any) => {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  });
};

export const filterCatalogImages = (array: any, _id: string) => {
  return array.filter((item: any) => item?._id == _id)?.[0]?.image;
};

export const lifehacksSort = (data: any) => {
  let arrayIndex = -1;

  return data.reduce((final: any, curr: any, index: number) => {
    if (index % 2 === 0) {
      final.push({data: [curr]});
      arrayIndex++;
    } else {
      final[arrayIndex].data.push(curr);
    }
    return final;
  }, []);
};

export const getNoun = (
  number: number,
  one: string,
  two: string,
  five: string,
) => {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
};

export const notificationType = (type: number) => {
  switch (type) {
    case 0:
      return 'Обслуживание';
    case 1:
      return 'Контакты';
    case 2:
      return 'Приглашение';
    case 3:
      return 'Приглашение';
    case 4:
      return 'Приглашение';
    case 5:
      return '?';
    case 6:
      return 'Отзывы';
    case 7:
      return '?';
    default:
      break;
  }
};

export const priceEnter = (price: any) => {
  if (price) {
    return price.toLocaleString('ru-RU');
  }
  return '';
};

export const getRandomColor = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const imagePickerGetName = (path: any) => {
  return path.split('/').pop().split('.').at(0);
};

export const filterRemindersTitle = (reminders: any, title: string) => {
  return reminders.filter((i: any) => i.time == title)?.at(0)?.title;
};

export const isSvg = (url: string) => {
  return url.split('.').pop() == 'svg';
};

export const openMaps = async (
  latitude: number,
  longitude: number,
  isShowPoing?: boolean,
) => {
  if (isShowPoing) {
    Linking.openURL(
      `https://yandex.ru/maps/?pt=${longitude},${latitude}&z=18&l=map`,
    );
  } else {
    Linking.openURL(
      `https://yandex.ru/maps/?rtext=~${latitude}%2C${longitude}`,
    );
  }
};

export const phoneMaskFormat = (phone: any) => {
  let x = phone
    .replace(/\D/g, '')
    .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/);

  let result = !x[2]
    ? x[1]
    : '7' + '(' + x[2] + ') ' + x[3] + (x[3] ? '-' + x[4] : '');
  return result;
};

export const uniqueMark = (array: any) => {
  return array.filter(
    (obj: any, idx: number, arr: any) =>
      idx === arr.findIndex((t: any) => t.mark.name === obj.mark.name),
  );
};
