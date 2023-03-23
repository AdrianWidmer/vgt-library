import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { BaseAPIService } from 'src/app/shared/services/base-services/base-service.service.ts';
import { <%=classify(name)%> } from './<%=classify(name)%>.model';

@Injectable()
export class <%=classify(name)%>Service extends BaseAPIService {

  requestURL: string = '<%= dasherize(name) %>';

  constructor(http: HttpClient, store: Store<AppState>) {
    super(http, store);
  }

  get<%= classify(name) %>s(): Observable<HttpResponse<<%=classify(name)%>[]>> {
    return this.get<<%=classify(name)%>[]>(`${this.requestURL}`);
  };

  create<%= classify(name) %>(<%= camelize(name) %>: <%= classify(name) %>): Observable<HttpResponse<<%=classify(name)%>>> {
    return this.post<<%=classify(name)%>>(`${this.requestURL}`, <%= camelize(name) %>);
  };

  update<%= classify(name) %>(<%= camelize(name) %>: <%= classify(name) %>): Observable<HttpResponse<<%=classify(name)%>>> {
    return this.put<<%=classify(name)%>>(`${this.requestURL}`, <%= camelize(name) %>);
  };

  delete<%= classify(name) %>(<%= camelize(name) %>Id: string): Observable<HttpResponse<boolean>> {
    return this.delete<boolean>(`${this.requestURL}`,<%= camelize(name) %>Id);
  };
}