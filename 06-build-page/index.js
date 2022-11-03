const path = require('path');
const { copyFile, mkdir, readdir, readFile, writeFile, rm, stat} = require('fs/promises');

async function createDir(patch) {
  try {
    await  mkdir(patch, {recursive: true});
    const removes = await readdir(patch);
    for (const file of removes) {
      await rm(path.join(patch, file), {recursive: true, force: true});
    } 
  }
  catch(err) {
    console.log(err.mwssage);
  }
  
}

async function createHTML(sours, output, component) {
  const template =  readFile(sours);
  let tempHTML = (await template).toString();

  const files = await readdir(component);
  for (const file of files) {
    const stats = await stat(path.join(component, file));
    if (stats.isFile()) {
      const fileName = path.parse(path.join(component, file));
      if (fileName.ext === '.html') {
        let name = `{{${fileName.name}}}`;

        if (tempHTML.includes(name)) {
          const tempTag = (await readFile(path.join(component, file))).toString();
          tempHTML = tempHTML.replace(name, tempTag);
          
        }
      }
    }
  }
  await writeFile(output, tempHTML);
  
  
}

async function copyDir(sours, output) {
  try {
    await createDir(output);
    const files = await readdir(sours);
    for (const file of files) {
      const stats = await stat(path.join(sours, file));
      if (stats.isFile()) {
        await copyFile(path.join(sours, file), path.join(output, file));
      } else if (stats.isDirectory()) {
        await copyDir(path.join(sours, file), path.join(output, file));
      }
     
    }
  }
  catch(err) {
    console.log(err.message); 
  }
}

async function createStyle(sours, output) {
  try {
    const template = [];
    const files = await readdir(sours);
    for (const file of files) {
      const stats = await stat(path.join(sours, file));
      if (stats.isFile()) {
        const extname = path.extname(path.join(sours, file));
        if (extname === '.css') {
          const input = await readFile(path.join(sours, file));
          template.push(input);
        }
      }
    }
    await writeFile(output, template.join('\n'));
  }
  catch(err) {
    console.log(err.nessage);
  }
 
}

const start = async () => {
  await createDir(path.join(__dirname, 'project-dist'));
  await createHTML(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'), path.join(__dirname, 'components'));
  await createStyle(path.join(__dirname, 'styles'), path.join(__dirname, 'project-dist', 'style.css'));
  await copyDir(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
};

start();
