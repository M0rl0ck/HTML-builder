const path = require('path');
const { readdir, stat } = require('fs/promises');

(async () => {
  const files = await readdir(path.join(__dirname, 'secret-folder'));
  for (const file of files) {
    const stats = await stat(path.join(__dirname, 'secret-folder', file));
    if (stats.isFile()) {
      const fileName = path.parse(path.join(__dirname, 'secret-folder', file));
      let ext = fileName.ext;
      let name = fileName.name;
      let size = stats.size;
      size = size / 1024;
      ext = ext.split('').splice(1).join('');
      console.log(`${name} - ${ext} - ${size}kb`);
    }
  }
})();