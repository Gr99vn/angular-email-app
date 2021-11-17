import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PreferencesComponent } from './preferences/preferences.component';

const routes: Routes = [
  {
    path: 'messages',
    loadChildren: () =>
      import('./messages/messages-routing.module').then(
        (m) => m.MessagesRoutingModule
      ),
  },
  { path: 'contacts', component: ContactsComponent },
  { path: 'prefs', component: PreferencesComponent },
  { path: '', redirectTo: 'messages', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
