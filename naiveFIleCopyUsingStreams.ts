import * as fs from 'fs';

const filename = './data/large-file.log';
const readStream = fs.createReadStream('./data/large-file.log');
const writeStream = fs.createWriteStream('./data/copy-large-file.log');

async function fileStatPromise(filename: string): Promise<any> {
  return new Promise((res, rej) => {
    fs.stat(filename, (err, data) => {
      if (err) {
        return rej;
      }
      res(data);
    });
  })
}

(async () => {
  let counter = 1;
  const fileMeta: fs.Stats = await fileStatPromise(filename);
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
