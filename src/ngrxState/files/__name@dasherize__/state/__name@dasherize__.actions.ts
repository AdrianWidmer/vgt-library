import { createAction, props } from "@ngrx/store";
import { <%=classify(name) %> } from '../<%=dasherize(name)%>.model';
import { Update } from "@ngrx/entity";

/************************************
 * <%=classify(name) %>s
 ************************************/

export const get<%=classify(name) %>s = createAction(
    "[<%=classify(name) %> Component] Get <%=classify(name) %>s"
)

export const create<%=classify(name) %> = createAction(
    "[<%=classify(name) %> Component] Create <%=classify(name) %>",
    props<{ <%=camelize(name) %>: <%=classify(name) %> }> ()
)

export const update<%=classify(name) %> = createAction(
    "[<%=classify(name) %> Component] Update <%=classify(name) %>",
    props<{ <%=camelize(name) %>: <%=classify(name) %> }> ()
)

export const delete<%=classify(name) %> = createAction(
    "[<%=classify(name) %> Component] Delete <%=classify(name) %>",
    props<{ <%=camelize(name) %>Id: string }> ()
)

export const storeSingle<%=classify(name) %> = createAction(
    "[<%=classify(name) %> Component] Store <%=classify(name) %>",
    props<{ <%=camelize(name) %>: <%=classify(name) %>}> ()
)

export const storeAll<%=classify(name) %>s = createAction(
    "[<%=classify(name) %> Component] Store All <%=classify(name) %>s",
    props<{ <%=camelize(name) %>s: <%=classify(name) %> []}> ()
)

export const storeUpdated<%=classify(name) %> = createAction(
    "[<%=classify(name) %> Component] Store Updated <%=classify(name) %>",
    props<{ <%=camelize(name) %>: Update<<%=classify(name) %>> }> ()
)

export const storeError = createAction(
    "[<%=classify(name) %> Effects] Store Error",
    props<{ error: string }>()
)

export const <%=classify(name) %>Actions = {
    get<%=classify(name) %>s,
    create<%=classify(name) %>,
    update<%=classify(name) %>,
    delete<%=classify(name) %>,
    storeSingle<%=classify(name) %>,
    storeAll<%=classify(name) %>s,
    storeUpdated<%=classify(name) %>,
    storeError
};
