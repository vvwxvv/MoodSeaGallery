// utils/getNumericOrder.js
export const getNumericOrder = (item) => {
    const order = item?.order;
    if (order === undefined || order === null || order === '') return Infinity;
    const num = Number(order);
    return isNaN(num) ? Infinity : num;
  };