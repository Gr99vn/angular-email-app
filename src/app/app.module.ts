import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { ContactsComponent } from './contacts/contacts.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { EmailBoxComponent } from './messages/email-box/email-box.component';
import { EmailPreviewComponent } from './messages/email-preview/email-preview.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { EmailDetailComponent } from './messages/email-detail/email-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    ContactsComponent,
    PreferencesComponent,
    EmailBoxComponent,
    EmailPreviewComponent,
    EmailDetailComponent,
    NotFoundComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
