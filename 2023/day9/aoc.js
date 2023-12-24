const fs = require('fs');
const data = fs.readFileSync('crawler/src/day9/2023day9.txt', 'utf8');
const lines = data.split(/\n/);
if (lines.at(-1) === '') lines.pop();
console.log('start');
// console.log(lines);
let output = 0;
let output2 = 0;
let lastNArr = [];

function day9(lines) {
  let sum = 0;
  lines.forEach((ln, i) => {
    // if (i > 0) return;
    output = 0;
    output2 = 0;
    lastNArr = [];
    // let n = getNextLine(ln).output;
    console.log(ln);
    let n2 = getNextLine(ln).output2;
    let last = Number(ln.split(' ')[ln.split(' ').length - 1]);
    let first = Number(ln.split(' ')[0]);
    // sum += n + last;
    sum += first - n2;
    // console.log({ output }, n, last, n + last);
    console.log({ output2 }, n2, first, first - n2);
  });
  console.log({ sum });
  return sum;
}

function getNextLine(ln) {
  // console.log('start line', ln);

  while (ln.split(' ').find((l) => l !== '0')) {
    let firstLn = ln.split(' ');
    let nextLn = [];
    firstLn.forEach((n, i) => {
      if (firstLn[i - 1]) {
        nextLn.push(n - firstLn[i - 1]);
      }
    });
    output += Number(nextLn[nextLn.length - 1]);
    lastNArr.push(Number(nextLn[0]));

    /**
     * 0 1
     *  1 2
     *   1 1
     *    0 0
     */
    // output2 += Number(nextLn[0]);
    console.log(nextLn.join(' '));
    // return nextLn.join(' ');
    // return nextLn[nextLn.length - 1];
    return getNextLine(nextLn.join(' '));
  }
  let num = 0;

  for (let i = lastNArr.length - 1; i >= 0; i--) {
    // console.log(lastNArr[i]);
    num = Number(lastNArr[i]) - num;
    // console.log({ num });
  }
  output2 = num;
  console.log({ num });
  return { output, output2 };
}
// }

day9(lines);
