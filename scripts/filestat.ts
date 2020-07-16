import * as fs from 'fs';

export default async function fileStatAsync(filename: string): Promise<fs.Stats> {
  return new Promise((res, rej) => {
    fs.stat(filename, (err, data) => {
      if (err) {
        return rej;
      }
      res(data);
    });
  })
}
