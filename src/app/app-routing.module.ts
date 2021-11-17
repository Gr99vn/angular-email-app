import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { MessagesComponent } from './messages/messages.component';
import { PreferencesComponent } from './preferences/preferences.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/messages",
    pathMatch: "full"
  },
  {
    path: "messages",
    loadChildren: () => import("./messages/messages-routing.module").then(m => m.MessagesRoutingModule)
  },
  {
    path: "contacts",
    component: ContactsComponent
  },
  {
    path: "prefs",
    component: PreferencesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
