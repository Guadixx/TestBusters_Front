const getMinMax = (list, field) => {
  const sorted = list.map((item) => item[field]).sort((a, b) => a - b);
  return [sorted[0], sorted[sorted.length - 1]];
};
export default getMinMax;
