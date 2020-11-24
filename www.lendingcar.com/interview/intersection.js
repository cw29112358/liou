const numbers1 = [1, 2, 2, 1];
const numbers2 = [2, 2];
const findIntersection = (n1, n2) => {
  const s1 = new Set(n1);
  return n2.filter((number) => s1.delete(number));
};
console.log(findIntersection(numbers1, numbers2));
