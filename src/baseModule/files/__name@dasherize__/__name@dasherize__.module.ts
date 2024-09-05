import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportsModule } from 'src/app/shared/module/imports.module';
import { <%= (name) %>RoutingModule } from './<%= dasherize(name) %>.routing';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ImportsModule,
    <%= name%>RoutingModule
  ]
})
export class <%= classify(name) %>Module { }
