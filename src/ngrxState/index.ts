import { strings, normalize } from '@angular-devkit/core';
import {
  Rule, Tree,
  apply, url, move,
  chain, mergeWith, template, SchematicContext
} from '@angular-devkit/schematics';
import { Schema } from './schema';

export function ngrxState(_options: Schema): Rule {
  return async (_tree: Tree, _context: SchematicContext) => {


    if (_options.path === undefined) {
      _options.path = `src/app/shared/entity-data`;
    }


    const sourceTemplates = url('./files');

    const _sourceParameterizedTemplates = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings
      }),
      move(normalize(_options.path as string))
    ]);

    return chain([
      mergeWith(_sourceParameterizedTemplates)
    ]);
  };
}