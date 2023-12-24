const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');

const lines = data.split(/\n/);

var patternsHorz = lines
  .map((row) => row.replace(/\./g, 0).replace(/#/g, 1))
  .join('\n')
  .split('\n\n')
  .map((pattern) => pattern.split('\n').map((row) => row.split('')));

var patternsVert = patternsHorz.map((pattern) => {
  var newRow = new Array(pattern.length).fill(0);
  var inverted = [];
  for (var i = 0; i < pattern[0].length; i++) {
    inverted.push([...newRow]);
    for (var j = 0; j < pattern.length; j++) {
      inverted[i][j] = pattern[j][i];
    }
  }
  return inverted;
});

[patternsHorz, patternsVert].forEach((patterns) => {
  for (var index in patterns) {
    patterns[index] = patterns[index].map((row) =>
      Number.parseInt(row.join(''), 2)
    );
  }
});

var findSymmetry = (array, mustHaveSmudge) => {
  for (var i = 1; i < array.length; i++) {
    var subA = array.slice(0, i).reverse();
    var subB = array.slice(i, array.length);
    if (sameStart(subA, subB, mustHaveSmudge)) {
      console.log({ i });
      return i;
    }
  }
  return 0;
};

// hori 1 10 5 3 1 12 16 13 3
// verti 1 9 4 11 2 16 1 1

var sameStart = (a, b, mustHaveSmudge) => {
  var smudgeFound = false;
  for (var i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] === b[i]) {
      continue;
    }
    if (!mustHaveSmudge || smudgeFound || Math.log2(a[i] ^ b[i]) % 1) {
      return false;
    }
    smudgeFound = true;
  }
  return mustHaveSmudge ? smudgeFound : true;
};

var sums = [0, 0];
var found = [0, 0];
let hor = [];
let ver = [];
for (var index in patternsHorz) {
  sums[0] += 100 * findSymmetry(patternsHorz[index]);
  sums[0] += findSymmetry(patternsVert[index]);
  sums[1] += 100 * findSymmetry(patternsHorz[index], true);
  sums[1] += findSymmetry(patternsVert[index], true);
}

console.log({ sums });
return sums;
