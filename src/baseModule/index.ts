import {
  apply,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import { normalize, strings } from '@angular-devkit/core';
import { Schema } from './schema';

export function createBaseModule(options: Schema): Rule {
  return (_: Tree, _context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      template({
        ...strings,
        ...options 
      }),
      move(normalize(options.path as string))
    ]);

    return chain([mergeWith(templateSource)]);
  };
}