const fs = require('fs');
const path = require('path');
const { stdout } = process;

const readFile = fs.createReadStream(
  path.join(__dirname, 'text.txt'),
  'utf-8');
readFile.on('data', chunk => stdout.write(chunk));
readFile.on('error', err => console.log(err.message));