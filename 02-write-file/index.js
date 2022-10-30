const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

process.on('exit', () => {
  stdout.write('Good bye.');
});
process.on('SIGINT', () => process.exit());
const out = fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdout.write('Hello, write some text.\n');
stdout.write('For quit write exit.\n');
stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    process.exit();
  }
  out.write(data);
});