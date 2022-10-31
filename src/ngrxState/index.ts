import { strings, normalize, virtualFs, workspaces } from '@angular-devkit/core';
import {
  Rule, Tree, SchematicsException,
  apply, url, move,
  chain, mergeWith, template, SchematicContext
} from '@angular-devkit/schematics';
import { Schema } from './schema';


function createHost(tree: Tree): workspaces.WorkspaceHost {
  return {
    async readFile(path: string): Promise<string> {
      const data = tree.read(path);
      if (!data) {
        throw new SchematicsException('File not found.');
      }
      return virtualFs.fileBufferToString(data);
    },
    async writeFile(path: string, data: string): Promise<void> {
      return tree.overwrite(path, data);
    },
    async isDirectory(path: string): Promise<boolean> {
      return !tree.exists(path) && tree.getDir(path).subfiles.length > 0;
    },
    async isFile(path: string): Promise<boolean> {
      return tree.exists(path);
    },
  };
}

export function ngrxState(_options: Schema): Rule {
  return async (_tree: Tree, _context: SchematicContext) => {

    if (_options?.isInAngularProject) {


      const host = createHost(_tree);
      const { workspace } = await workspaces.readWorkspace('/', host);

      const project = (_options.path != null) ? workspace.projects.get(_options.path) : null;
      if (!project) {
        throw new SchematicsException(`Invalid project name: ${_options.path}`);
      }

      const projectType = project.extensions.projectType === 'application' ? 'app' : 'lib';


      if (_options.path === undefined) {
        _options.path = `${project.sourceRoot}/${projectType}`;
      }
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