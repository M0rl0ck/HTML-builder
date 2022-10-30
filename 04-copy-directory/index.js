const path = require('path');
const { copyFile, mkdir, readdir, unlink } = require('fs/promises');

async function copyDir() {
  try {
    await mkdir(path.join(__dirname, 'files-copy'), {recursive: true});
    const removes = await readdir(path.join(__dirname, 'files-copy'));
    for (const file of removes) {
      await unlink(path.join(__dirname, 'files-copy', file));
    };
    const files = await readdir(path.join(__dirname, 'files'));
    for (const file of files) {
      await copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file));
    };
  }
  catch(err) {
    console.log(err.message);
  }
}

copyDir();