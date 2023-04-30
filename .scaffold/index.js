const chokidar = require('chokidar');
const fs = require('fs');

const lowercaseFirstLetter = str => str.charAt(0).toLowerCase() + str.slice(1);

const templates = {
    index: name => `export * from './${name}';`,
    component: name => `import { FC } from 'react';

import styles from './${name}.module.scss';

export type ${name}Props = {
  prop: string;
};

const ${name}: FC<${name}Props> = ({ prop }) => (
  <div className={styles.${lowercaseFirstLetter(name)}}>
    {prop}
  </div>
);

export default ${name};`,
    scss: name => `.${lowercaseFirstLetter(name)} {}`
};

const fileExists = path => file => fs.existsSync(`${path}/${file}`);

const writeToPath = path => (file, content) => {
    const filePath = `${path}/${file}`;

    fs.writeFile(filePath, content, err => {
        if (err) throw err;
        console.log('Created file: ', filePath);
        return true;
    });
};

function createFiles(folderPath, folderName) {
    const name = folderName.slice(2);
    const path = folderPath
        .split('/')
        .reduce((acc, s) => {
            acc.push(s === folderName ? name : s);
            return acc;
        }, [])
        .join('/');

    const files = {
        index: 'index.ts',
        component: `${name}.tsx`,
        scss: `${name}.module.scss`
    };

    if (name !== 'components') {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }

        const writeFile = writeToPath(path);
        const toFileMissingBool = file => !fileExists(path)(file);
        const checkAllMissing = (acc, cur) => acc && cur;

        const noneExist = Object.values(files).map(toFileMissingBool).reduce(checkAllMissing);

        if (noneExist) {
            console.log(`Detected new component: ${name}, ${path}`);
            Object.entries(files).forEach(([type, fileName]) => {
                writeFile(fileName, templates[type](name));
            });
            fs.rmSync(folderPath, { recursive: true, force: true });
        }
    }
}

const watcher = chokidar.watch('**', { ignored: /node_modules/ }).on('addDir', (path, event) => {
    const folderName = path.split('/').pop();

    if (folderName.startsWith('G-') && !folderName.includes('/')) {
        createFiles(path, folderName);
    }
});
