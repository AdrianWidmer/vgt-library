import {
  chain,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url,
  apply,
  mergeWith
} from '@angular-devkit/schematics';
import { normalize, strings } from '@angular-devkit/core';
import { Schema } from './schema';

function convertToKebabCase(str: string): string {
  return str
    // Insert a hyphen before any uppercase letter that follows a lowercase letter or number
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    // Replace any sequence of non-alphanumeric characters with a single hyphen
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .toLowerCase();
}

function addRouteToAppRoutingModule(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const modulePath = '/src/app/app-routing.module.ts';
    const sourceText = tree.read(modulePath);

    if (!sourceText) {
      throw new Error(`File ${modulePath} does not exist.`);
    }

    let sourceContent = sourceText.toString('utf-8');
    const moduleName = convertToKebabCase(options.name);
    const routeToAdd = `
      ,{
        path: '${options.route}',
        loadChildren: () => import('${options.path}/${moduleName}/${moduleName}.module').then(m => m.${options.name}Module),
      }`;

    // Find the AppLayoutComponent route
    const appLayoutStart = sourceContent.indexOf("component: AppLayoutComponent");
    if (appLayoutStart === -1) {
      throw new Error('Unable to find AppLayoutComponent route');
    }

    // Find the children array within the AppLayoutComponent route
    const childrenStart = sourceContent.indexOf('children: [', appLayoutStart);
    if (childrenStart === -1) {
      throw new Error('Unable to find children array in AppLayoutComponent route');
    }

    // Find the end of the children array
    let bracketCount = 1;
    let childrenEnd = childrenStart + 'children: ['.length;
    while (bracketCount > 0 && childrenEnd < sourceContent.length) {
      if (sourceContent[childrenEnd] === '[') bracketCount++;
      if (sourceContent[childrenEnd] === ']') bracketCount--;
      childrenEnd++;
    }

    // Insert the new route at the end of the children array
    const updatedContent =
      sourceContent.slice(0, childrenEnd - 1) +
      (sourceContent[childrenEnd - 2] === '[' ? '' : ',') +
      routeToAdd +
      sourceContent.slice(childrenEnd - 1);

    tree.overwrite(modulePath, updatedContent);

    return tree;
  };
}

export function ngGenerateBaseModule(options: Schema): Rule {
  return chain([
    mergeWith(
      apply(url('./files'), [
        template({ ...strings, ...options }),
        move(normalize(options.path)),
      ])
    ),
    addRouteToAppRoutingModule(options),
  ]);
}