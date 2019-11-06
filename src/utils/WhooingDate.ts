export namespace WhooingDate {
  export const ParseNumber = (dateNumber: number): Date => {

    dateNumber =
      typeof dateNumber === "string" ? Number(dateNumber) : dateNumber;
    dateNumber = Math.floor(dateNumber);
    const year = dateNumber / 10000;
    const month = Math.floor((dateNumber % 10000) / 100 - 1);
    const day = dateNumber % 100;
    return new Date(year, month, day);
  };

  export const ConvertNumber = (date: Date): number => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year * 10000 + month * 100 + day;
  };
}
