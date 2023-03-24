const GetUnics = (list, filtro) => {
  const unics = [];
  const noUnics = list.map((item) => item[filtro]);
  noUnics.sort();
  let index = 1;
  noUnics.forEach((element) => {
    if (element !== noUnics[index]) {
      unics.push(element);
    }
    index++;
  });
  return unics;
};
export default GetUnics;
