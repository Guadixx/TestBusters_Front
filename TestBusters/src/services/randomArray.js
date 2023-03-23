const randomArray = (min, max, range, excludes = -1, excludes_2 = -1) => {
  let random = [];
  while (random.length < range) {
    const newNumber = Math.ceil(Math.random() * (max - min));
    if (!random.includes(newNumber) && newNumber != excludes && newNumber != excludes_2) {
      random.push(newNumber);
    }
  }
  return random;
};
export default randomArray;
