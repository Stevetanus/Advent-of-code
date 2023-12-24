const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
const lines = data.split(/\n/);
if (lines.at(-1) === '') lines.pop();
console.log('start');
// console.log(lines);

function day12(lines) {
  const breakpoint = /\.+/;
  lines.map((ln, y) => {
    let [conditions, groupStr] = ln.split(' ');
    // let [conditions, groupStr] = ln.replaceAll('?', '.').split(' ');
    if (y < 1) {
      let group = groupStr.split(',');
      groupLength = group.reduce(
        (prev, curr) => Number(prev) + Number(curr),
        0
      );
      let countee = 0;

      for (let i = 0; i < groupLength; i++) {}

      let q = [];
      let st = [];

      ln.split('').map((v, x) => {
        if (v === '#') {
          q,
            push({
              x,
            });
        } else {
          st.push({
            x,
          });
        }
      });

      console.log(
        { conditions },
        conditions.length,
        conditions.split(breakpoint),
        groupStr.split(',')
      );
    }
    // ??. #.? ?#. .??
    // ... # ... # ....
    // ## . # ... # ....
    // . ### ... # ....
    // .. ### .. # ....
    // ... # . ### ....
  });
}

function arrangeStudents(spaces, students, currentArrangement = []) {
  if (spaces === 0) {
    console.log(currentArrangement);
    return;
  }

  for (let i = 0; i <= students; i++) {
    const newArrangement = [...currentArrangement, i];
    arrangeStudents(spaces - 1, students, newArrangement);
  }
}

const spacesAvailable = 10;
const studentsToArrange = 7;
arrangeStudents(spacesAvailable, studentsToArrange);

// day12(lines);
