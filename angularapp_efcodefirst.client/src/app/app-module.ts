import { HttpClientModule } from '@angular/common/http';
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { EmployeeListComponent } from './employee-list.component';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule,
    AppRoutingModule, EmployeeListComponent
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
