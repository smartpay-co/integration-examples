fs = require('fs');

const lines = fs.readFileSync('./src/client.js', {
  encoding: 'utf8',
  flag: 'r',
});
const parsed = process.env.PUBLIC_KEY
  ? lines.replace('<YOUR_PUBLIC_KEY>', process.env.PUBLIC_KEY)
  : lines;

fs.writeFileSync('./build/client.js', parsed, { encoding: 'utf8' });
