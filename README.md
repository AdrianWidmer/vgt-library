# Library for VGT Plattform

Libray to use with [Angular CLI](https://github.com/angular/angular-cli).

# How to install

Run the command:

```bash
npm i vgt-library --legacy-peer-deps 
```

(Needs to be done only once, when creating a new project based on Angular for VGT)




# How to create NGRX State

Run the command:


```bash
ng generate vgt-library:ngrxState
```

there are 2 additional inputs:

1. Name of the state (creates also model with same name)
2. Path (for example: src/app/shared/entity-data)

Result: Creates 6 Files

- stateName.actions.ts
- stateName.effects.ts
- stateName.model.ts
- stateName.reducer.ts
- stateName.selectors.ts
- stateName.service.ts

