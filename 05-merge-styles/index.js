const path = require('path');
const { readdir, stat, readFile, writeFile} = require('fs/promises');

(async () => {
  const template = [];
  const files = await readdir(path.join(__dirname, 'styles'));
  for (const file of files) {
    const stats = await stat(path.join(__dirname, 'styles', file));
    if (stats.isFile()) {
      const extname = path.extname(path.join(__dirname, 'styles', file));
      if (extname === '.css') {
        const input = await readFile(path.join(__dirname,  'styles', file));
        template.push(input);
      }
    }
  };
  await writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), template.join('\n'));
})();

