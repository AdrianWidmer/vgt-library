import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, combineLatest } from 'rxjs';
import {
    catchError,
    map,
    repeat,
    switchMap,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/shared/services/error.service';
import { EffectHelper } from 'src/app/shared/services/effect.helper';
import { <%=classify(name) %>Actions } from './<%=dasherize(name)%>.actions'
import { <%=classify(name) %>} from "../<%=dasherize(name)%>.model";
import { <%=classify(name) %>Service } from "../<%=dasherize(name)%>.service";

@Injectable()
export class <%=classify(name) %>Effects extends EffectHelper {

    /**
     * @description Get all <%=classify(name) %>s
     * 
     * If successful, stored in <%=classify(name) %>State.
     */
    get<%=classify(name) %>$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(<%=classify(name) %>Actions.get<%=classify(name) %>s),
                switchMap((action) => this.<%=classify(name) %>Service.get<%=classify(name) %>s()),
                map((<%=camelize(name)%>Response) => {
                    return <%=camelize(name)%>Response?.body?.map((<%=camelize(name)%>) => { return { ...new <%=classify(name) %>(<%=camelize(name)%>) } });
                }),
                map((<%=camelize(name)%>s: <%=classify(name) %>[]) => {
                    this.store.dispatch(
                        <%=classify(name) %>Actions.storeAll<%=classify(name) %>s({
                            <%=camelize(name)%>s: <%=camelize(name)%>s,
                        })
                    );
                }),
                catchError((error: HttpErrorResponse) => {
                    return this.handleError(error);
                }),
                repeat()
            ),
        { dispatch: false, resubscribeOnError: true }
    );


    /**
     * @description Create a new <%=classify(name) %>
     *
     * If successful, stored in <%=classify(name) %>State.
     */
    createNew<%=classify(name) %>$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(<%=classify(name) %>Actions.create<%=classify(name) %>),
                switchMap((action) => {
                    return combineLatest([
                        this.<%=classify(name) %>Service.create<%=classify(name) %>(action.<%=camelize(name)%>),
                        of(action),
                    ]);
                }),
                map(([response, action]) => {
                    this.store.dispatch(
                        <%=classify(name) %>Actions.storeSingle<%=classify(name) %>({
                            <%=camelize(name)%>: response?.body,
                        })
                    );
                }),
                catchError((error: HttpErrorResponse) => {
                    return this.handleError(error);
                }),
                repeat()
            ),
        { dispatch: false, resubscribeOnError: true }
    );


    /**
     * @description Update a <%=classify(name) %>
     *
     * If successful, stored in <%=classify(name) %>State.
     */
    update<%=classify(name) %>$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(<%=classify(name) %>Actions.update<%=classify(name) %>),
                switchMap((action) =>
                    combineLatest([
                        this.<%=classify(name) %>Service.update<%=classify(name) %>(action.<%=camelize(name)%>),
                        of(action),
                    ])
                ),
                map(([response, action]) => {
                    this.store.dispatch(
                        <%=classify(name) %>Actions.storeUpdated<%=classify(name) %>({
                            <%=camelize(name)%>: {
                                id: action.<%=camelize(name)%>.id,
                                changes: action.<%=camelize(name)%>,
                            },
                        })
                    );
                }),
                catchError((error: HttpErrorResponse) => {
                    return this.handleError(error);
                }),
                repeat()
            ),
        { dispatch: false, resubscribeOnError: true }
    );

        /**
     * @description Delete a <%=classify(name) %>
     *
     * If successful, stored in <%=classify(name) %>State.
     */
    delete<%=classify(name) %>$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(<%=classify(name) %>Actions.delete<%=classify(name) %>),
                switchMap((action) => {
                    return this.<%=classify(name) %>Service.delete<%=classify(name) %>(
                            action.<%=camelize(name)%>Id
                    );
                }),
                catchError((error: HttpErrorResponse) => {
                    return this.handleError(error);
                 }),
                repeat()
                ),
        { dispatch: false, resubscribeOnError: true }
        );

    constructor(
        private actions$: Actions,
        private <%=camelize(name) %>Service: <%=classify(name) %>Service,
        public store: Store,
        public errorService: ErrorService,
    ) {
        super(store, <%=classify(name) %>Actions.storeError, errorService);
    }
}
