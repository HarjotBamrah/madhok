import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTyreComponent } from './add-tyre/add-tyre.component';
import { environment } from 'src/environments/environment';
import { AddAlloysComponent } from './add-alloys/add-alloys.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TyresComponent } from './tyres/tyres.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTyreComponent,
    AddAlloysComponent,
    TyresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
