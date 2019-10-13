/* eslint-disable import/no-extraneous-dependencies */
import shell from 'shelljs';

const buildFolder = './build/';

const files = new Set(['.env', 'LICENSE', 'README.md', 'package.json', 'package-lock.json']);
const folders = new Set(['./src/views', './src/public']);

// Copy Files
files.forEach((file) => {
  shell.cp('-R', file, buildFolder);
});

// Copy Folders
folders.forEach((folder) => {
  shell.cp('-R', folder, buildFolder);
});
