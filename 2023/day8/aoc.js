const fs = require('fs');
const data = fs.readFileSync(
  '/Users/hsien-chengwang/Desktop/202307/crawler/src/day8/2023day8.txt',
  'utf8'
);
const lines = data.split(/\n/);
if (lines.at(-1) === '') lines.pop();
console.log('start');
// console.log(lines);

function day8(lines) {
  let instructions = lines[0];
  // for (let i = 0; i < 1000000; i++) {
  //   instructions += lines[0];
  // }
  lines.shift();
  lines.shift();
  let nodeObj = {};
  let go = {
    L: {},
    R: {},
  };
  let starts = [];
  let ends = [];
  lines.forEach((ln) => {
    let [node, directions] = ln.split('=');
    let left = directions.slice(2, 5);
    let right = directions.slice(7, 10);
    node = node.trim();
    if (node.endsWith('A')) starts.push(node);
    if (node.endsWith('Z')) ends.push(node);
    // nodeObj[node] = {};
    // nodeObj[node].L = left;
    // nodeObj[node].R = right;
    // if (right === 'ZZZ') console.log({ node });
    go.L[node] = left;
    go.R[node] = right;
  });

  let count = 0;
  let destination = 'AAA';

  // for (let i = 0; i < instructions.length; i++) {
  //   // console.log(nodeObj[destination], instructions[i]);
  //   destination = nodeObj[destination][instructions[i]];
  //   count++;
  //   // console.log({ destination, count });
  //   if (destination === 'ZZZ') {
  //     console.log('ans: ', count);
  //     break;
  //   }
  // }

  // while (starts.find((e) => !e.endsWith('Z'))) {
  //   for (let i = 0; i < starts.length; i++) {
  //     starts[i] = go[instructions[count % instructions.length]][starts[i]];
  //   }
  //   count++;
  // }

  let county = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  starts.forEach((s, i) => {
    let des = s;
    while (!des.endsWith('Z')) {
      des = go[instructions[county[i] % instructions.length]][des];
      county[i]++;
      if (des.endsWith('Z')) console.log('stop!');
    }
  });

  console.log({ county, starts });

  const lcm = (...arr) => {
    const gcd = (x, y) => (!y ? x : gcd(y, x % y));
    const _lcm = (x, y) => (x * y) / gcd(x, y);
    return [...arr].reduce((a, b) => _lcm(a, b));
  };

  console.log(lcm(12, 7)); // 84 5 2 1 0
  console.log(lcm(12, 4)); // 4 0
  console.log(lcm(...[20777, 18673, 13939, 17621, 19199, 12361])); // 60
  // console.log({ starts, count });
}

// function checkDestination(destination, nodeObj, instructions, count) {
//   for (let i = 0; i < instructions.length; i++) {
//     console.log(nodeObj[destination], instructions[i]);
//     destination = nodeObj[destination][instructions[i]];
//     count++;
//     console.log({ destination, count });
//     if (destination === 'ZZZ') {
//       console.log('ans: ', count);
//       return { destination, count };
//     }
//   }
//   return { destination, count };
// }

day8(lines);
