import * as fs from 'fs';
import fileStatAsync from './filestat';

const filename = 'large-file.log';
const filepath = `./data/${filename}`;
const readStream = fs.createReadStream(filepath);
const writeStream = fs.createWriteStream(`./data/copy-${filename}`);

(async () => {
  let counter = 1;
  const fileMeta = await fileStatAsync(filename);
  const fileSize = fileMeta.size;

  readStream.on('data', (chunk) => {
    const percentageCopied = ((chunk.length * counter) / fileSize) * 100;
    console.log(`Progress: ${Math.round(percentageCopied)}%`);
    counter += 1;
  });

  readStream.on('end', () => {
    console.log('Finished operation');
    return;
  });

  readStream.on('error', (e) => {
    console.log('Error while copying file', e);
  });

  writeStream.on('finish', () => {
    console.log('Successfully copied the file');
  });
})();
