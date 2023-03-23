import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as ReducerSelectors from './<%=dasherize(name) %>.reducer';
import { <%=classify(name) %>State } from './<%=dasherize(name)%>.reducer';

export const <%=classify(name) %>FeatureSelector =
createFeatureSelector<<%=classify(name) %>State> (
    '<%=camelize(name)%>'
);

export const selectIsLoaded = createSelector(
  <%=classify(name) %>FeatureSelector,
  (state) => state?.isLoaded
);

export const select<%=classify(name) %>s = createSelector(
  <%=classify(name) %>FeatureSelector,
  ReducerSelectors.select<%=classify(name)%>s
);

export const select<%=classify(name) %>Error = createSelector(
  <%=classify(name) %>FeatureSelector,
  (state) => state.error
);
