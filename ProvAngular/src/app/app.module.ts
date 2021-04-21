import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetEmployeesService } from './get-employees.service';
import { TabellaComponent } from './tabella/tabella.component';

@NgModule({
  declarations: [
    AppComponent,
    TabellaComponent
  ],

  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],

  providers: [
    GetEmployeesService,
    HttpClientModule
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
