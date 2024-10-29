export const searchList = (array: any, text: string, key: string) => {
  return array.filter(function (item: any) {
    const nameUpperCase = item?.[key]
      ? item[key].toUpperCase()
      : ''.toUpperCase();
    const textUpperCase = text.trim().toUpperCase();

    return nameUpperCase.includes(textUpperCase);
  });
};
