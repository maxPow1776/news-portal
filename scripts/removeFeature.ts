import { JsxAttribute, Node, Project, SyntaxKind } from 'ts-morph';

const removedFeatureName = process.argv[2];
const featureState = process.argv[3];

const toggleFunctionName = 'toggleFeatures';
const toggleComponentName = 'ToggleFeatures';

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
    if (child.isKind(SyntaxKind.Identifier) && child.getText() === toggleFunctionName) {
      isToggleFunction = true;
    }
  });
  return isToggleFunction;
}

function isToggleComponent(node: Node) {
  const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);
  return identifier?.getText() === toggleComponentName;
}

const replaceToggleFunction = (node: Node) => {
  const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);
  if (!objectOptions) return;

  const featureNamePropery = objectOptions.getProperty('name');
  const onFunctionPropery = objectOptions.getProperty('on');
  const offFunctionPropery = objectOptions.getProperty('off');
  const featureName = featureNamePropery?.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getText().slice(1, -1);
  const onFunction = onFunctionPropery?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
  const offFunction = offFunctionPropery?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);

  if (featureName !== removedFeatureName) return;
  if (featureState === 'on') {
    node.replaceWithText(onFunction?.getBody().getText() ?? '');
  }
  if (featureState === 'off') {
    node.replaceWithText(offFunction?.getBody().getText() ?? '');
  }
};

const getAttributeNodeByName = (jsxAttributes: JsxAttribute[], name: string) =>
  jsxAttributes.find((node) => node.getName() === name);

const getReplacedComponent = (attribure?: JsxAttribute) => {
  const value = attribure?.getFirstDescendantByKind(SyntaxKind.JsxExpression)?.getExpression()?.getText();
  if (value?.startsWith('(')) return value.slice(1, -1);
  return value;
};

const replaceToggleComponent = (node: Node) => {
  const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

  const featureNameAttribute = getAttributeNodeByName(attributes, 'feature');
  const onAttribute = getAttributeNodeByName(attributes, 'on');
  const offAttribute = getAttributeNodeByName(attributes, 'off');
  const featureName = featureNameAttribute?.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getText().slice(1, -1);

  if (featureName !== removedFeatureName) return;

  const onValue = getReplacedComponent(onAttribute);
  const offValue = getReplacedComponent(offAttribute);

  if (featureState === 'on' && onValue) {
    node.replaceWithText(onValue);
  }
  if (featureState === 'off' && offValue) {
    node.replaceWithText(offValue);
  }
};

files.forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      replaceToggleFunction(node);
    }
    if (node.isKind(SyntaxKind.JsxSelfClosingElement) && isToggleComponent(node)) {
      replaceToggleComponent(node);
    }
  });
});

project.save();
