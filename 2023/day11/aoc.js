const fs = require('fs');
const data = fs.readFileSync('./2023day11.txt', 'utf8');
const lines = data.split(/\n/);
if (lines.at(-1) === '') lines.pop();
console.log('start');
// console.log(lines);

function day11(lines) {
  let ySet = new Set();
  let xSet = new Set();

  lines.map((ln, y) => {
    ySet.add(Number(y));
  });

  for (let i = 0; i < lines[0].length; i++) {
    xSet.add(i);
  }

  let stars = [];
  let disArr = [];

  lines.map((ln, y) => {
    ln.split('').map((v, x) => {
      if (v === '#') {
        ySet.delete(Number(y));
        xSet.delete(Number(x));
        stars.push({ y, x });
      }
    });
  });

  let mapee = [...lines];
  let lnLength = mapee[0].length;
  let indexArr = [];
  stars.map((st, startIndex) => {
    let match = 0;
    while (match < stars.length - startIndex - 1) {
      match++;
      let dis = 0;
      let endY = Number(stars[startIndex + match].y);
      let startY = Number(st.y);
      let endX = Number(stars[startIndex + match].x);
      let startX = Number(st.x);
      let dist = Math.abs(startX - endX) + Math.abs(startY - endY);
      dis += dist;
      // if (disArr.length < 1) {
      // console.log({ startX, endX, startY, endY, dist });
      for (const x of xSet) {
        let biggerX = startX > endX ? startX : endX;
        let smallerX = startX > endX ? endX : startX;
        if (x < biggerX && x > smallerX) {
          // console.log({ x, biggerX, smallerX });
          dis += 999999;
        }
      }
      for (const y of ySet) {
        let biggerY = startY > endY ? startY : endY;
        let smallerY = startY > endY ? endY : startY;
        if (y < biggerY && y > smallerY) {
          if (startIndex < 1) {
            console.log({ y, startIndex, st, biggerY, smallerY });
          }
          dis += 999999;
        }
      }

      // }
      // 5, 10

      // console.log({ dis });
      // if (startIndex < 1 && match < 1 && endX < 2) {
      //   console.log({ startIndex, match, dis });
      // }
      indexArr.push({ startIndex, match });
      disArr.push(dis);
    }
  });

  console.log(disArr.length);
  console.log({ indexArr, disArr });
  let sum = disArr.reduce((prev, curr) => prev + curr, 0);

  // let sortX = Array.from(xSet).sort();
  // let xSet2 = new Set(sortX);
  // let sortY = Array.from(ySet).sort();
  // let ySet2 = new Set(sortY);
  // console.log({ ySet2, xSet2, stars });
  // console.log(disArr[0], disArr[1], disArr[2]);
  console.log('p1: ', sum);
}

day11(lines);
