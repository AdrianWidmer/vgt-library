import { createReducer, on } from "@ngrx/store"
import { <%=classify(name)%> } from "./<%=classify(name)%>.model";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { <import { camelize } fromimportimport { camelize } from "@angular-devkit/core/src/utils/strings";
 { camelize } from "@angular-devkit/core/src/utils/strings";
 "@angular-devkit/core/src/utils/strings";
%=classify(name)%>Actions } from './<%=classify(name)%>.actions'


export interface <%=classify(name)%>State extends EntityState<<%=classify(name)%>> {
    ids: [];
    entities: {};
    isLoaded: boolean;
    error: string;
}   

export const initial<%=classify(name)%>State: <%=classify(name)%>State = {
  ids: [],
  entities: {},
  isLoaded: false,
  error: '',
}

/**
 * @description Set entity adapter for <%=classify(name)%>.
 */
export const adapter: EntityAdapter<<%=classify(name)%>> =
  createEntityAdapter<<%=classify(name)%>>({
    selectId: (<%=classify(name)%>) => <%=classify(name)%>._id,
  });

export const admin<%=classify(name)%>Reducer = createReducer(
    initial<%=classify(name)%>State,

  on(<%=classify(name)%>Actions.get<%=classify(name)%>s, (state, action) => {
    return { ...state, error: null, isLoaded: false };
  }),

  on(<%=classify(name)%>Actions.storeAll<%=classify(name)%>s, (state, action) => {
    return adapter.upsertMany(action.<%=camelize(name)%>s, { ...state, error: null, isLoaded: true });
  }),

  on(<%=classify(name)%>Actions.storeUpdated<%=classify(name)%>, (state, action) => {
    return adapter.updateOne(action.<%=camelize(name)%>, { ...state, error: null });
  }),

  on(<%=classify(name)%>Actions.delete<%=classify(name)%>, (state, action) => {
    return adapter.removeOne(action.<%=camelize(name)%>Id, { ...state, error: null });
  }),

  on(<%=classify(name)%>Actions.storeError, (state, action) => {
    return { ...state, error: action.error };
  }),
)

export const { selectAll } = adapter.getSelectors();

export const select<%=classify(name)%>s = selectAll;