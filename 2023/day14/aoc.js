const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
const lines = data.split(/\n/);
if (lines.at(-1) === '') lines.pop();
console.log('start');
console.log(lines);

function day14(lines) {
  let rock = {};
  let stop = {};
  console.log(lines.length);
  for (let i = 0; i < lines.length; i++) {
    stop[i] = lines.length;
  }
  let sum = 0;
  let rc = 0;
  let dot = 0;
  lines.map((ln, y) => {
    let isStop = false;
    ln.split('').map((v, x) => {
      if (v === 'O') {
        sum += stop[x];
        rc++;
        if (y < 4) {
          // console.log(x, stop[x]);
        }
        stop[x]--;
      }
      if (v === '#') {
        if (!isStop) {
          dot += x;
          console.log({ x });
          isStop = true;
        }
        stop[x] = lines.length - y - 1;
      }
    });
  });
  console.log({ rc, dot });
  console.log('p1:', { sum });
}

day14(lines);

/**
 *   
OOOO.#.O.. 10
OO..#....#  9
OO..O##..O  8
O..#.OO...  7
........#.  6
..#....#.#  5
..O..#.O.O  4
..O.......  3
#....###..  2
#....#....

OOOO.#O... 10
OO..#....#  9
OOO..##O..  8
O..#OO....  7
........#.  6
..#....#.#  5
O....#OO..  4
O.........  3
#....###..  2
#....#....

.....#.... 10
....#.O..#  9
O..O.##...  8
O.O#......  7
O.O....O#.  6
O.#..O.#.#  5
O....#....  4
OO....OO..  3
#O...###..  2
#O..O#....

.....#.... 10
....#...O#  9
...OO##...  8
.OO#......  7
.....OOO#.  6
.O#..,O#.#  5
....O#....  4
......OOOO  3
#...O###..  2
#.OOO#...O

....O#....
.OOO#....#
.....##...
.OO#....OO
......OO#.
.O#...O#.#
....O#..OO
.........O
#....###..
#..OO#....



O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
 * 
 * 
 */
