import { Node, Project, SyntaxKind } from 'ts-morph';

const removedFeatureName = process.argv[2];
const featureState = process.argv[3];

if (!removedFeatureName) {
  throw new Error('Specify the name of the feature flag');
}

if (!featureState) {
  throw new Error('Specify the state of the feature (on or off)');
}
if (featureState !== 'on' && featureState !== 'off') {
  throw new Error('Incorrect feature state value (on or off)');
}

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

function isToggleFunction(node: Node) {
  let isToggleFunction = false;
  node.forEachChild((child) => {
    if (child.isKind(SyntaxKind.Identifier) && child.getText() === 'toggleFeatures') {
      isToggleFunction = true;
    }
  });
  return isToggleFunction;
}

files.forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);
      if (!objectOptions) return;

      const featureNamePropery = objectOptions.getProperty('name');
      const onFunctionPropery = objectOptions.getProperty('on');
      const offFunctionPropery = objectOptions.getProperty('off');
      const featureName = featureNamePropery
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        .slice(1, -1);
      const onFunction = onFunctionPropery?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
      const offFunction = offFunctionPropery?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);

      if (featureName !== removedFeatureName) return;
      if (featureState === 'on') {
        node.replaceWithText(onFunction?.getBody().getText() ?? '');
      }
      if (featureState === 'off') {
        node.replaceWithText(offFunction?.getBody().getText() ?? '');
      }
    }
  });
});

project.save();
