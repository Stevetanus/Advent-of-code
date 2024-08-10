const fs = require("fs");
const data = fs.readFileSync("2023/day3/input.txt", "utf8");
const lines = data.split(/\n/);
if (lines.at(-1) === "") lines.pop();
console.log("start");

const isDigit = (char) => /[0-9]/.test(char);
const isSymbol = (char) => char !== "." && !isDigit(char);

function part1(lines) {
  let numStrArr = [];
  let numberReg = /[0-9]{1,3}/gm;
  let specialReg = /[@*$+-=$#&]/;

  let matchee = [];
  lines.map((l, i) => {
    const matchArr = l.match(numberReg);
    let matches = [...l.matchAll(numberReg)];
    let matchIndexArr = [];
    matches.forEach((m) => {
      // console.log({ m });
      matchIndexArr.push(m.index);
      matchee.push({
        x: i,
        y: m.index + m[0].length,
        m: m[0],
      });
    });

    matchArr.map((match, matchIndex) => {
      let start =
        matchIndexArr[matchIndex] - 1 > 0 ? matchIndexArr[matchIndex] - 1 : 0;
      let end = matchIndexArr[matchIndex] + match.length + 1;
      let isMatch = false;
      if (l[start] && isSymbol(l[start])) {
        isMatch = true;
      }
      if (l[end - 1] && isSymbol(l[end - 1])) {
        isMatch = true;
      }
      if (lines[i - 1]) {
        let st = lines[i - 1].slice(start, end);
        for (let z = 0; z < st.length; z++) {
          if (isSymbol(st[z])) {
            isMatch = true;
          }
        }
      }
      if (lines[i + 1]) {
        let st = lines[i + 1].slice(start, end);
        for (let z = 0; z < st.length; z++) {
          if (isSymbol(st[z])) {
            isMatch = true;
          }
        }
      }
      if (isMatch) {
        // console.log(match);
        numStrArr.push(match);
      }
    });
  });

  let party = 0;

  lines.map((ln, x) => {
    ln.split("").map((v, y) => {
      let parts = [];
      if (v === "*") {
        matchee.map((match) => {
          if (x - 1 >= 0) {
            if (
              match.x === x - 1 &&
              match.y - y > -1 &&
              match.y - match.m.length <= y + 1
            ) {
              parts.push(match.m);
            }
          }
          if (
            match.x === x &&
            match.y - y > -1 &&
            match.y - match.m.length <= y + 1
          ) {
            parts.push(match.m);
          }
          if (x + 1 < lines.length) {
            if (
              match.x === x + 1 &&
              match.y - y > -1 &&
              match.y - match.m.length <= y + 1
            ) {
              parts.push(match.m);
            }
          }
        });
        console.log(x, { parts });
      }
      if (parts.length === 2) {
        let multi = Number(parts[0]) * Number(parts[1]);
        console.log({ multi });
        party += multi;
      }
    });
  });

  // console.log({ matchee });

  let sum = numStrArr.map(Number).reduce((prev, curr) => {
    return prev + curr;
  }, 0);
  console.log("p1: ", sum);
  console.log("p2: ", party);
}

part1(lines);
