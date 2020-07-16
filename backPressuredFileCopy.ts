import * as fs from 'fs';
import fileStatAsync from './filestat';

const filename = 'large-file.log';
const filepath = `./data/${filename}`;
const readStream = fs.createReadStream(filepath);
const writeStream = fs.createWriteStream(`./data/back-pressured-copy-${filename}`);

(async () => {
  let counter = 1;
  const filemeta = await fileStatAsync(filepath)
  const filesize = filemeta.size;

  readStream.on('data', (chunk) => {
    let percentageCopied = ((chunk.length * counter) / filesize) * 100;
    counter += 1;
    console.log(`Progress => ${percentageCopied}`);
  });

  readStream.pipe(writeStream);

  writeStream.on('error', (err) => {
    console.log('Something went wrong while copying', err);
  });
})();
