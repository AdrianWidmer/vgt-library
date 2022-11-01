/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  FileOperator,
  Rule,
  Tree,
  apply,
  applyTemplates,
  chain,
  filter,
  forEach,
  mergeWith,
  move,
  noop,
  strings,
  url,
} from '@angular-devkit/schematics';
import { addDeclarationToNgModule } from './utility/add-declaration-to-ng-module';
import { findModuleFromOptions } from './utility/find-module';
import { parseName } from './utility/parse-name';
import { validateHtmlSelector } from './utility/validation';
import { Schema } from './schema';
import { getWorkspace } from './utility/workspace';

function buildSelector(options: Schema, projectPrefix: string) {
  let selector = strings.dasherize(options.name);
  selector = `${projectPrefix}-${selector}`;
  return selector;
}

export function dialog(options: Schema): Rule {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);
    const project = workspace.projects.get(options.project as string);

    if (options.path === undefined) {
      options.path = 'src/app/components';
    }


    if(project) {
      console.log('project', project);


    } else {

    }


    options.module = findModuleFromOptions(host, options);

    const parsedPath = parseName(options.path as string, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;
    options.selector =
      options.selector || buildSelector(options, 'app');

    validateHtmlSelector(options.selector);

    const skipStyleFile = false;
    const templateSource = apply(url('./files'), [
      options.skipTests ? filter((path) => !path.endsWith('.spec.ts.template')) : noop(),
      skipStyleFile ? filter((path) => !path.endsWith('.__style__.template')) : noop(),
      options.inlineTemplate ? filter((path) => !path.endsWith('.html.template')) : noop(),
      applyTemplates({
        ...strings,
        'if-flat': (s: string) => (options.flat ? '' : s),
        ...options,
      }),
      !options.type
        ? forEach(((file) => {
          return file.path.includes('..')
            ? {
              content: file.content,
              path: file.path.replace('..', '.'),
            }
            : file;
        }) as FileOperator)
        : noop(),
      move(parsedPath.path),
    ]);

    console.log(templateSource)

    return chain([
      addDeclarationToNgModule({
        type: 'component',
        ...options,
      }),
      mergeWith(templateSource),
    ]);
  };
}
