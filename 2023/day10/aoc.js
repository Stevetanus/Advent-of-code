const fs = require('fs');
const data = fs.readFileSync('./2023day10.txt', 'utf8');
const lines = data.split(/\n/);
if (lines.at(-1) === '') lines.pop();
console.log('start');
// console.log(lines);

function day10(lines) {
  let [si, sj] = [31, 28];
  let [east, west, south, north] = [0, 0, 0, 0];
  let start = {
    I: '31',
    J: '28',
  };

  if (lines[si][sj] === 'F') {
  }

  lines.map((ln, i) => {
    for (let j = 0; j < ln.length; j++) {
      if (lines[i][j] === 'S') {
        console.log({ i, j });
      }
    }
  });
}

day10(lines);
