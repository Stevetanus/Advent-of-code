const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
const lines = data.split(/\n/);
if (lines.at(-1) === '') lines.pop();
console.log('start');

class Module {
  constructor(name, type, outputs) {
    this.name = name;
    this.type = type;
    this.outputs = outputs;

    if (type === '%') {
      this.memory = 'off';
    } else {
      this.memory = {};
    }
  }

  represent() {
    console.log(
      `name: ${this.name}, type: ${this.type}, outputs: ${
        this.outputs
      }, memory: ${JSON.stringify(this.memory)}`
    );
  }
}

function day20(lines) {
  let modules = {};
  let broadcastList = [];
  let specialInput = '';
  let toSpecialInputObj = {};
  let cycleLengths = {};

  lines.map((ln, y) => {
    const [input, output] = ln.split('->').map((v) => v.trim());
    let outputs = output.split(', ');
    if (input !== 'broadcaster') {
      let name = input.slice(1);
      let type = input[0];
      if (output === 'rx') specialInput = name;
      modules[name] = new Module(name, type, outputs);
    } else {
      broadcastList = outputs;
    }
  });

  Object.values(modules).map((m, i) => {
    m.outputs.forEach((output) => {
      if (output in modules && modules[output].type === '&') {
        modules[output].memory[m.name] = 'lo';
      }
      if (output === specialInput) {
        toSpecialInputObj[m.name] = 0;
      }
    });
  });

  let lo = 0;
  let hi = 0;
  let presses = 0;

  for (let i = 0; i < 5000; i++) {
    presses++;
    lo++;
    let q = [];
    broadcastList.forEach((output) => {
      q.push(['broadcaster', output, 'lo']);
    });

    while (q.length) {
      const [origin, target, palse] = q.shift();
      if (target === specialInput && palse === 'hi') {
        toSpecialInputObj[origin]++;

        if (!cycleLengths[origin]) {
          cycleLengths[origin] = presses;
        }
      }

      if (palse === 'lo') {
        lo++;
      } else {
        hi++;
      }

      if (target in modules) {
        let module = modules[target];
        if (module.type === '%') {
          if (palse === 'lo') {
            module.memory = module.memory === 'off' ? 'on' : 'off';
            let onGoing = module.memory === 'off' ? 'lo' : 'hi';
            for (let j = 0; j < module.outputs.length; j++) {
              q.push([module.name, module.outputs[j], onGoing]);
            }
          }
        } else {
          module.memory[origin] = palse;
          let onGoing = Object.values(module.memory).every(
            (pal) => pal === 'hi'
          )
            ? 'lo'
            : 'hi';
          for (let j = 0; j < module.outputs.length; j++) {
            q.push([module.name, module.outputs[j], onGoing]);
          }
        }
      }
    }
  }

  console.log('p1: ', lo * hi, { lo, hi });
  console.log({ toSpecialInputObj });
  console.log({ cycleLengths });
  let sum = lcm(...Object.values(cycleLengths));
  console.log('p2: ', sum);
}

const lcm = (...arr) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const _lcm = (x, y) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

day20(lines);
