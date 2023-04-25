import { Project } from 'ts-morph';
import path from 'path';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();
const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');
const shardUiDirectory = project.getDirectory(uiPath);
const componentsDirs = shardUiDirectory?.getDirectories();

const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
const isAbsolute = (value: string) => layers.some((layer) => value.startsWith(layer));

componentsDirs?.forEach((directory) => {
  const indexfilePath = `${directory.getPath()}/index.ts`;
  const indexFile = directory.getSourceFile(indexfilePath);

  if (!indexFile) {
    const sourceCode = `export * from './${directory.getBaseName()}';\n`;
    const file = directory.createSourceFile(indexfilePath, sourceCode);
    file.save();
  }
});

files.forEach((sourceFile) => {
  const importDeclarations = sourceFile.getImportDeclarations();
  importDeclarations.forEach((importDeclaration) => {
    const value = importDeclaration.getModuleSpecifierValue();
    const valueWithoutAlias = value.replace('@/', '');

    const segments = valueWithoutAlias.split('/');
    const isSharedLayer = segments?.[0] === 'shared';
    const isUiSlice = segments?.[1] === 'ui';

    if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUiSlice) {
      const result = valueWithoutAlias.split('/').slice(0, 3).join('/');
      importDeclaration.setModuleSpecifier(`@/${result}`);
    }
  });
});

project.save();
