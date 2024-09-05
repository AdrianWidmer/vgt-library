# VGT Platform Library

A library for use with [Angular CLI](https://github.com/angular/angular-cli) to streamline development within the VGT platform.

## Installation

To install the library, run:

```bash
yarn add vgt-library
```

This should be done only once when setting up a new Angular project for VGT.

## Creating an NGRX State

To generate an NGRX state, use the following command:

```bash
ng generate vgt-library:ngrxState
```

You will be prompted to provide two inputs:

1. **Name of the state**: This will also create a model with the same name.
2. **Path**: The location where the state files will be generated (e.g., `src/app/shared/entity-data`).

This command creates six files:

- `stateName.actions.ts`
- `stateName.effects.ts`
- `stateName.model.ts`
- `stateName.reducer.ts`
- `stateName.selectors.ts`
- `stateName.service.ts`

## Creating a Base Angular Module Structure

To generate a base Angular module structure for your project, use the following command:

```bash
ng generate vgt-library:baseModule
```

You will be prompted to provide two inputs:

1. **Module Name**: The name of the module to be created.
2. **Path**: The location where the module should be created (e.g., `src/app`).

This command will create the following structure:

- A folder with the module name.
- Inside the module folder:
  - `components/` (with a `.gitkeep` file)
  - `entities/` (with a `.gitkeep` file)
  - `enums/` (with a `.gitkeep` file)
  - `models/` (with a `.gitkeep` file)
  - `pipes/` (with a `.gitkeep` file)
  - `resolvers/` (with a `.gitkeep` file)
  - `services/` (with a `.gitkeep` file)
  - `utils/` (with a `.gitkeep` file)
- Two files:
  - `moduleName.module.ts`
  - `moduleName.routing.ts`

### Example

If you run:

```bash
ng generate vgt-library:baseModule --moduleName=User --path=src/app/modules
```

It will generate:

- `src/app/modules/User/`
  - `components/`
  - `entities/`
  - `enums/`
  - `models/`
  - `pipes/`
  - `resolvers/`
  - `services/`
  - `utils/`
  - `User.module.ts`
  - `User.routing.ts`

## License

This library is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
