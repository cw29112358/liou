// // let targetArray = [1, 2, 3, 1, -1, 4, -1];
// let targetArray = [-1, -2, -3, 4];
// targetArray = targetArray.sort((a, b) => a > b);
// console.log(targetArray);
// const closestSum = (start, end, targetSum, number) => {
//   console.log(start, end, targetSum, number);
//   if (number === 2) {
//     let i = start;
//     let j = end;
//     let sum;
//     while (i < j) {
//       sum = targetArray[i] + targetArray[j];
//       if (sum === targetSum || i === j - 1) break;
//       if (sum < targetSum) i += 1;
//       else j -= 1;
//     }
//     return sum;
//     // return [sum, targetArray[i], targetArray[j]];
//   }
//   let result = [];
//   let oldDiff = 9999;
//   let diff;
//   let firstValeu;
//   targetArray.some((v, index) => {
//     if (index < start || index > end || end - (index + 1) < number - 2) return false;
//     const newTargetSum = targetSum - v;
//     result = closestSum(index + 1, end, newTargetSum, number - 1);
//     diff = newTargetSum - result[0];
//     if (Math.abs(diff) < Math.abs(oldDiff)) {
//       oldDiff = diff;
//       firstValeu = v;
//     }
//     return diff === 0;
//   });
//   return targetSum - diff;
//   // result[0] = targetSum - diff;
//   // result.push(firstValeu);
//   // return result;
// };
//
// // console.log(closestSum(0, targetArray.length - 1, 9, 2));
// console.log(closestSum(0, targetArray.length - 1, -2, 3));
