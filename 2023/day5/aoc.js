const fs = require('fs');
const data = fs.readFileSync('crawler/src/day5/2023day5.txt', 'utf8');
const lines = data.split(/\n/);
if (lines.at(-1) === '') lines.pop();
console.log('start');

let ex = [];

function part1(lines) {
  let seeds = lines[0].split(':')[1].trim().split(' ').map(Number);
  let newSeeds = [];
  // for (let i = 0; i < seeds.length; i += 2) {
  //   console.log(seeds[i]);
  //   for (let j = seeds[i]; j < seeds[i] + seeds[i + 1]; j++) {
  //     newSeeds.push(j);
  //   }
  // }
  console.log({ seeds, newSeeds });

  let mapping = {};
  let key = '';
  lines.forEach((line, i) => {
    if (i < 2 || !line) return;
    if (line.includes('map')) {
      key = line.split(' ')[0];
      mapping[key] = [];
    } else {
      const [end, start, range] = line.split(' ').map(Number);

      mapping[key].push({
        end,
        start,
        range,
      });
    }
  });

  // Object.keys(mapping).map((k) => {
  //   diffMap(mapping, k, seeds);
  // });

  // diffMap(mapping, 'seed-to-soil', seeds);
  // diffMap(mapping, 'soil-to-fertilizer', seeds);
  // diffMap(mapping, 'fertilizer-to-water', seeds);
  // diffMap(mapping, 'water-to-light', seeds);
  // diffMap(mapping, 'light-to-temperature', seeds);
  // diffMap(mapping, 'temperature-to-humidity', seeds);
  // diffMap(mapping, 'humidity-to-location', seeds);

  mapping['seed-to-soil'].map((m) => {
    newSeeds.push(m.end);
  });
  console.log({ newSeeds });

  diffMap(mapping, 'seed-to-soil', newSeeds);
  diffMap(mapping, 'soil-to-fertilizer', newSeeds);
  diffMap(mapping, 'fertilizer-to-water', newSeeds);
  diffMap(mapping, 'water-to-light', newSeeds);
  diffMap(mapping, 'light-to-temperature', newSeeds);
  diffMap(mapping, 'temperature-to-humidity', newSeeds);
  diffMap(mapping, 'humidity-to-location', newSeeds);

  function diffMap(map, ki, seeds) {
    seeds.forEach((seed, i) => {
      map[ki].map((m) => {
        if (seed >= m.start && seed < m.start + m.range) {
          seeds[i] = m.end + (seed - m.start);
        }
      });
    });
  }

  // part1 ans
  // console.log({ seeds });
  // console.log(Math.min(...seeds));

  // console.log({ newSeeds });
  console.log(Math.min(...newSeeds));
  let minOutput = Math.min(...newSeeds);
  let idx = newSeeds.findIndex((sed) => sed === minOutput);
  console.log(mapping['seed-to-soil'][idx]);
  for (let i = 0; i < seeds.length; i += 2) {
    if (
      seeds[i] >= mapping['seed-to-soil'][idx].start &&
      seeds[i] <
        mapping['seed-to-soil'][idx].start + mapping['seed-to-soil'][idx].range
    ) {
      console.log(seeds[i]);
    }
  }
  // console.log(
  //   mapping['seed-to-soil'][newSeeds.findIndex(Math.min(...newSeeds))]
  // );
}

function part2(lines) {
  let mapping = {};
  let key = '';
  lines.forEach((line, i) => {
    if (i < 2 || !line) return;
    if (line.includes('map')) {
      key = line.split(' ')[0];
      mapping[key] = [];
    } else {
      const [end, start, range] = line.split(' ').map(Number);

      mapping[key].push({
        end,
        start,
        range,
      });
    }
  });

  // mapping['seed-to-soil'].map((m, i) => {

  //   mapping['soil-to-fertilizer'].map((sec, i) => {
  //     if (m.end >= sec.start && m < sec.start + sec.range) {
  //       m.end =
  //     }
  //   })
  // })

  Object.keys(mapping).map((ki, i) => {
    mapping[ki].map((m) => {
      m.end;
    });
  });
}

part1(lines);

// part2(lines);
